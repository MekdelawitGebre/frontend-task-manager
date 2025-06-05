import React, { useState } from "react";

const initialTasks = [
  { id: 3, title: "Internship", completed: false },
  { id: 4, title: "Exam", completed: true },
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      setError("Task title must not be empty.");
      return;
    }
    if (newTask.trim().length > 100) {
      setError("Task title must be less than 100 characters.");
      return;
    }
    setError("");
    const newTaskObj = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (filter === "all" || filter === "pending") {
        return a.completed - b.completed; 
      }
      return 0; 
    });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          value={newTask}
          placeholder="Add a new task"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      {/* Filter buttons */}
      <div style={{ marginTop: "15px" }}>
        <button
          className="filter-btn"
          style={{ opacity: filter === "all" ? 1 : 0.6 }}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="filter-btn"
          style={{ opacity: filter === "completed" ? 1 : 0.6 }}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className="filter-btn"
          style={{ opacity: filter === "pending" ? 1 : 0.6 }}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Task list */}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {filteredTasks.length === 0 && <li>No tasks found.</li>}
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />
            <span className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
