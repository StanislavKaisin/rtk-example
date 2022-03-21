import React from "react";
import { useAppDispatch } from "../app/hooks";
import {
  deleteTodo,
  Itodo,
  removeTodo,
  toggleStatus,
  toggleTodoComplete,
} from "../app/todoSlice";
// import { Itodo } from "../App";

interface ItodoListItemProps {
  todo: Itodo;
  // toggleTodoComleted: Function;
  // removeTodo: Function;
}

const TodoItem: React.FC<ItodoListItemProps> = ({
  todo,
  // toggleTodoComleted,
  // removeTodo,
}) => {
  const dispatch = useAppDispatch();
  const { id, completed, text, title } = todo;

  return (
    <li key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          // toggleTodoComleted(id);
          // dispatch(toggleTodoComplete(todo));
          dispatch(toggleStatus(todo.id));
        }}
      />
      <span>{text ? text : title}</span>
      <span
        style={{
          color: "red",
          marginLeft: "1rem",
          fontSize: "1.5rem",
          fontWeight: "bolder",
        }}
        className="delete"
        onClick={() => {
          // console.log("first");
          dispatch(deleteTodo(todo.id));
        }}
      >
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
