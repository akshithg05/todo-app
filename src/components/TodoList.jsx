import TodoCard from "./TodoCard";

export default function TodoList({
  todos,
  selectedTab,
  handleDeleteTodo,
  handleDoneTodo,
  handleEditTodo,
}) {
  const filteredTodosList =
    selectedTab === "All"
      ? todos
      : selectedTab === "Completed"
      ? todos.filter((todo) => todo.complete)
      : selectedTab === "Open"
      ? todos.filter((todo) => !todo.complete)
      : [];

  return (
    <>
      {filteredTodosList?.map((todo, todoIndex) => {
        return (
          <TodoCard
            key={todoIndex}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            todoIndex={todos?.findIndex((val) => val.input === todo.input)}
            handleDoneTodo={handleDoneTodo}
            handleEditTodo={handleEditTodo}
          />
        );
      })}
    </>
  );
}
