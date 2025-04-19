import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  // const initialTodos = [
  //   {
  //     input: "Hello! Add your first todo!",
  //     complete: true,
  //   },
  //   { input: "Get the groceries!", complete: false },
  //   { input: "Learn how to web design", complete: false },
  //   { input: "Say hi to gran gran", complete: true },
  // ];

  const [todos, setTodos] = useState();
  const [selectedTab, setSelectedTab] = useState("All");

  function handleAddTodo(newTodo) {
    const newTodoList = [
      ...todos,
      {
        input: newTodo,
        complete: false,
      },
    ];
    setTodos(newTodoList);
    handleSaveDate(newTodoList);
  }

  function handleDoneTodo(index) {
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo.complete = !completedTodo.complete;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveDate(newTodoList);
  }

  function handleEditTodo(index, input) {
    let newTodoList = [...todos];
    let editedTodo = todos[index];
    editedTodo.input = input;
    newTodoList[index] = editedTodo;
    setTodos(newTodoList);
    handleSaveDate(newTodoList);
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((todo, todoIndex) => index !== todoIndex);
    setTodos(newTodoList);
    handleSaveDate(newTodoList);
  }

  function handleSaveDate(currentTodos) {
    localStorage.setItem("todo-app", JSON.stringify(currentTodos));
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo-app");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList
        todos={todos}
        selectedTab={selectedTab}
        handleDeleteTodo={handleDeleteTodo}
        handleDoneTodo={handleDoneTodo}
        handleEditTodo={handleEditTodo}
      />
      <TodoInput handleAddTodo={handleAddTodo} handleDoneTodo={handleDoneTodo} />
    </>
  );
}
