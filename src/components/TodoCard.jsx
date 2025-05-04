import { useState } from "react";

export default function TodoCard({
  todo,
  handleDeleteTodo,
  todoIndex,
  handleDoneTodo,
  handleEditTodo,
}) {
  const [editTodo, setEditTodo] = useState(false);
  const [editedInput, setEditedInput] = useState(todo.input);

  return (
    <div className="card todo-item">
      <div className="todo-buttons">
        {!editTodo && <p className={todo.complete ? "strike" : ""}>{todo.input}</p>}
        {editTodo && (
          <input
            value={editedInput}
            onChange={(e) => {
              setEditedInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditTodo(todoIndex, editedInput);
                setEditTodo(false);
              }
            }}
          />
        )}
        {!todo.complete && !editTodo && (
          <button
            className="done-button"
            disabled={todo.complete || editTodo}
            onClick={() => {
              handleDoneTodo(todoIndex);
            }}
          >
            <h6>Done</h6>
          </button>
        )}
        {todo.complete && !editTodo && (
          <button
            className="done-button"
            onClick={() => {
              handleDoneTodo(todoIndex);
            }}
          >
            <h6>Undo Task</h6>
          </button>
        )}
        {editTodo && (
          <button
            className="done-button"
            onClick={() => {
              handleEditTodo(todoIndex, editedInput);
              setEditTodo(false);
            }}
          >
            <h6>Save task</h6>
          </button>
        )}
        <button
          className="edit-button"
          onClick={() => {
            setEditTodo(true);
          }}
        >
          <h6>Edit</h6>
        </button>
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteTodo(todoIndex);
          }}
        >
          <h6>Delete</h6>
        </button>
      </div>
    </div>
  );
}
