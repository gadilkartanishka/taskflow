import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  toggleTask,
} from "../features/tasks/tasksSlice";
import { deleteProject } from "../features/projects/projectsSlice";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);

  const project = projects.find((p) => p._id === id);
  const [formData, setFormData] = useState({ title: "", dueDate: "" });
  useEffect(() => {
    dispatch(fetchTasks(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    dispatch(createTask({ ...formData, projectId: id }));
    setFormData({ title: "", dueDate: "" });
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject(id));
    navigate("/dashboard");
  };



  const completedTasks = tasks.filter((t) => t.status === "complete").length;
  const openTasks = tasks.length - completedTasks;
  const totalTasks = tasks.length;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title" style={{ visibility: "hidden" }}>Tasks</h1>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => navigate("/dashboard", { state: { openNewProject: true } })} style={{ background: "var(--accent)", color: "white", padding: "0.5rem 1rem", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: 500 }}>
            + New Project
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-label">Active Projects</div>
          <div className="stat-card-value">{projects.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Open Tasks</div>
          <div className="stat-card-value">{openTasks}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Completed</div>
          <div className="stat-card-value">{completedTasks}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Tasks</div>
          <div className="stat-card-value">{totalTasks}</div>
        </div>
      </div>

      <div className="task-section">
        <div className="task-section-header" style={{ borderBottom: "none", marginTop: "1rem" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#8b5cf6", marginRight: "0.5rem" }}></div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>{project?.title || "Project Tasks"}</h2>
          <div className="task-section-more" onClick={handleDeleteProject} style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", color: "#ef4444" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete Project
          </div>
        </div>

        <form className="task-input-row" onSubmit={handleSubmit} style={{ borderStyle: "solid", marginBottom: "1rem" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid var(--border)", flexShrink: 0 }}></div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Add a new task..."
            required
            style={{ flex: 1, minWidth: "50px" }}
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            style={{ width: "auto", border: "1px solid var(--border)", borderRadius: "var(--r-xs)", padding: "4px 8px" }}
          />
          <button type="submit" className="btn-add" style={{ flexShrink: 0 }}>
            +
          </button>
        </form>

        {loading ? (
          <div className="loading" style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty" style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No tasks yet.</div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`task-row ${task.status === "complete" ? "completed" : ""}`}
                style={{ gridTemplateColumns: "1fr auto" }}
              >
                <div className="task-row-left">
                  <div
                    className={`task-checkbox ${task.status === "complete" ? "checked" : ""}`}
                    onClick={() => dispatch(toggleTask(task._id))}
                    style={{ borderRadius: "50%" }}
                  >
                    {task.status === "complete" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                  <div>
                    <div className="task-row-name" style={{ textDecoration: task.status === "complete" ? "line-through" : "none", color: task.status === "complete" ? "var(--text-muted)" : "var(--text)", fontWeight: 500 }}>
                      {task.title}
                    </div>
                    {task.dueDate && (
                      <div className="task-due-date" style={{ marginTop: "2px" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    background: task.status === "complete" ? "var(--status-done-bg)" : "var(--status-todo-bg)",
                    color: task.status === "complete" ? "var(--status-done-text)" : "var(--status-todo-text)"
                  }}>
                    {task.status === "complete" ? "Completed" : "In Progress"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
