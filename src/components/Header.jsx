export default function Header({ todos }) {
  const todosLength = todos.filter((todo) => !todo.complete).length;

  const isTasksPlural = todosLength !== 1;
  const taskString = isTasksPlural ? "tasks" : "task";
  return (
    <header>
      <h1 className="text-gradient">{`You have ${todosLength} open ${taskString}`}</h1>
    </header>
  );
}
