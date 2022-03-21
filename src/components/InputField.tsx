import React from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../app/todoSlice";

interface IInputFieldProps {
  text: string;
  handleText: Function;
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}

const InputField: React.FC<IInputFieldProps> = ({
  text,
  handleText,
  handleSubmit,
}) => {
  const dispatch = useAppDispatch();
  return (
    <label>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          return dispatch(
            addTodo({
              id: "",
              text,
              completed: false,
            })
          );
        }}
      >
        <input
          placeholder="enter text"
          value={text}
          onChange={(e) => {
            handleText(e.target.value);
          }}
        />
        <button type="submit">Add todo</button>
      </form>
    </label>
  );
};

export default InputField;
