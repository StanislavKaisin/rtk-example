import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

export interface Itodo {
  id: string;
  text: string;
  title?: string;
  completed: boolean;
}

const initialState: {
  todos: Itodo[];
  status: null | "loading" | "resolved" | "rejected";
  error: null | string;
} = {
  todos: [],
  status: null,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Itodo>) {
      // console.log("state=", state);
      // console.log("action=", action);
      action.payload.id = new Date().toISOString();
      state.todos.push({
        ...action.payload,
      });
    },
    removeTodo(state, action: PayloadAction<Itodo>) {
      // console.log("removeTodo");
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    },
    toggleTodoComplete(state, action: PayloadAction<Itodo>) {
      const toggledTodo = state.todos.find((todo) => {
        return todo.id === action.payload.id;
      });
      toggledTodo && (toggledTodo.completed = !toggledTodo?.completed);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export const BASE_URL = `https://jsonplaceholder.typicode.com/todos`;

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  // to send error action use reject with value
  async (_, { rejectWithValue }) => {
    // const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    // return response.data;
    try {
      const response = await fetch(`${BASE_URL}?_limit=10`);
      if (!response.ok) {
        throw new Error("Server error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Server error! Can't delete a task!`);
      }
      dispatch(removeTodo({ id } as Itodo));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const todo = (state as RootState).todos.todos.find((item) => {
      return item.id === id;
    });
    console.log("todo", todo);
    if (!todo) return;
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server error! Can't toggle a task's ststus!`);
      }
      const data = await response.json();
      console.log("data", data);
      dispatch(toggleTodoComplete(todo));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
