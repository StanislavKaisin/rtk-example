import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { set } from "immer/dist/internal";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import { addTodo, fetchTodos, Itodo } from "./app/todoSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

// export interface Itodo {
//   id: string;
//   text: string;
//   completed: boolean;
// }

function App() {
  const dispatch = useAppDispatch();
  const [text, settext] = useState("");
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // const addTask = () => {
  //   if (text.trim().length) {
  //     dispatch(addTodo({ id: "", text, completed: false }));
  //     settext("");
  //   }
  // };
  const todos = useAppSelector((state) => state.todos.todos);
  const { status, error } = useAppSelector((state) => state.todos);

  // const [todos, settodos] = useState<Itodo[]>([]);

  // const deleteTodo = (todoId: string) => {};

  // const toggleTodoComleted = (todoId: string) => {
  //   addTask(
  //     todos.map((todo) => {
  //       if (todo.id !== todoId) return todo;
  //       todo.completed = !todo.completed;
  //       return todo;
  //     })
  //   );
  // };
  return (
    <div className="App">
      <InputField text={text} handleText={settext} />
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>Error...{error}</h2>}

      <TodoList
        todos={todos}
        // toggleTodoComleted={toggleTodoComleted}
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
