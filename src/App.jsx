import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useAuth } from "./context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  const { globalUser, globalData, isLoading, setGlobalData } = useAuth();
  const isAuthenticated = globalUser;
  const isData = globalData && Object.keys(globalData || []).length;

  const [todos, setTodos] = useState([]);
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
    handleSaveData(newTodoList);
  }

  function handleDoneTodo(index) {
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo.complete = !completedTodo.complete;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleEditTodo(index, input) {
    let newTodoList = [...todos];
    let editedTodo = todos[index];
    editedTodo.input = input;
    newTodoList[index] = editedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((todo, todoIndex) => index !== todoIndex);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  async function handleSaveData(currentTodos) {
    if (!globalUser) return; // Ensure user is logged in

    try {
      const userRef = doc(db, "users", globalUser.uid);
      await setDoc(userRef, { todos: currentTodos }, { merge: true });
      setGlobalData((prev) => ({ ...prev, todos: currentTodos }));
    } catch (err) {
      console.error("Error saving todos to Firestore:", err);
    }
  }

  useEffect(() => {
    if (globalData?.todos) {
      setTodos(globalData.todos);
    }
  }, [globalData]);

  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <p></p>
      {isLoading ? (
        <div className="loading-info">Loading...</div>
      ) : globalUser ? (
        <>
          <TodoList
            todos={todos}
            selectedTab={selectedTab}
            handleDeleteTodo={handleDeleteTodo}
            handleDoneTodo={handleDoneTodo}
            handleEditTodo={handleEditTodo}
          />
          <TodoInput handleAddTodo={handleAddTodo} handleDoneTodo={handleDoneTodo} />
        </>
      ) : (
        <div className="login-info">
          <h2>Login to start adding items to your list!</h2>
        </div>
      )}
    </>
  );
}
