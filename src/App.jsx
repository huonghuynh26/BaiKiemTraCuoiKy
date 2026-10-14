import { useState } from "react";
import "./App.css";

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

function TrashIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Do coding challenges", active: true },
    { id: 2, title: "Do coding challenges", active: true },
    { id: 3, title: "Do coding challenges", active: false },
  ]);
  const [tab, setTab] = useState("all");
  const [input, setInput] = useState("");

  const visibleTasks = tasks.filter((task) => {
    if (tab === "active") return task.active;
    if (tab === "completed") return !task.active;
    return true;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, active: true }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, active: !task.active } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteAllCompleted = () => {
    setTasks(tasks.filter((task) => task.active));
  };

  return (
    <div className="container">
      <h1 className="title">#todo</h1>

      <div className="tabs">
        {TABS.map((item) => (
          <button
            key={item.key}
            className={`tab ${tab === item.key ? "tab-active" : ""}`}
            onClick={() => setTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab !== "completed" && (
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="add details"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <ul className="task-list">
        {visibleTasks.map((task) => (
          <li key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={!task.active}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.active ? "" : "done"}>{task.title}</span>
            </label>
            {tab === "completed" && (
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                <TrashIcon />
              </button>
            )}
          </li>
        ))}
      </ul>

      {tab === "completed" && (
        <div className="delete-all-wrap">
          <button
            className="delete-all"
            onClick={deleteAllCompleted}
            disabled={visibleTasks.length === 0}
          >
            <TrashIcon size={12} />
            delete all
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
