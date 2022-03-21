import React from "react";
import { useAppSelector } from "../app/hooks";
import { Itodo } from "../app/todoSlice";
// import { Itodo } from "../App";
import TodoItem from "./TodoItem";

interface ItodoListProps {
  todos: Itodo[];
  // toggleTodoComleted: Function;
  // removeTodo: Function;
}

const TodoList: React.FC<ItodoListProps> = (
  {
    // todos,
    // removeTodo,
    // toggleTodoComleted,
  }
) => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <ul>
      {todos.map((todo) => {
        // return JSON.stringify(todo, null, 2);
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            // removeTodo={removeTodo}
            // toggleTodoComleted={toggleTodoComleted}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
