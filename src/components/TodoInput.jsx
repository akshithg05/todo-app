import { useState } from "react";

export default function TodoInput({ handleAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit() {
    if (!inputValue.trim()) return;
    handleAddTodo(inputValue.trim());
    setInputValue("");
  }

  return (
    <div className="input-container">
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Add Task"
      />
      <button onClick={handleSubmit}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
