import { useAuth } from "../context/AuthContext";

export default function Tab({ todos, selectedTab, setSelectedTab }) {
  const { globalUser } = useAuth();
  const tabs = ["All", "Open", "Completed"];
  return (
    <nav className="tab-container">
      {tabs.map((tab, tabIndex) => {
        const numTasks =
          tab === "All"
            ? todos?.length
            : tab === "Open"
            ? todos?.filter((todo) => !todo.complete).length
            : tab === "Completed"
            ? todos?.filter((todo) => todo.complete).length
            : 0;

        return (
          <button
            onClick={() => setSelectedTab(tab)}
            key={tabIndex}
            className={"tab-button " + (tab === selectedTab ? "tab-selected" : "")}
          >
            <h4>
              {tab} <span>{globalUser ? numTasks : 0}</span>
            </h4>
          </button>
        );
      })}
      <hr />
    </nav>
  );
}
