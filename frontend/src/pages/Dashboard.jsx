import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  createProject,
  deleteProject,
} from "../features/projects/projectsSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { projects, loading } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.openNewProject) {
      setShowForm(true);
      // clear the state so it doesn't reopen if the user refreshes
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formData));
    setFormData({ title: "", description: "" });
    setShowForm(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteProject(id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title" style={{ visibility: "hidden" }}>Overview</h1>
        <div className="page-actions">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
            style={{ background: "var(--accent)", color: "white", padding: "0.5rem 1rem", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: 500 }}
          >
            {showForm ? "Cancel" : "+ New Project"}
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
          <div className="stat-card-value">-</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Completed</div>
          <div className="stat-card-value">-</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Tasks</div>
          <div className="stat-card-value">-</div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form 
            className="modal" 
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()} 
            style={{ background: "white", padding: "1.5rem", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}
          >
            <div className="modal-header">
              <h3 className="modal-title">Create New Project</h3>
              <button type="button" className="btn-icon" onClick={() => setShowForm(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project title"
                required
                style={{ padding: "0.5rem", borderRadius: "var(--r-xs)", border: "1px solid var(--border)" }}
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project description"
                style={{ padding: "0.5rem", borderRadius: "var(--r-xs)", border: "1px solid var(--border)", minHeight: "80px" }}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ background: "var(--accent)", color: "white", border: "none" }}>
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-center">
          <div className="spinner"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="empty-state" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)", background: "white", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
          <h3>No projects yet</h3>
          <p>Click '+ New Project' to get started</p>
        </div>
      ) : (
        <div className="task-section">
          <div className="task-section-header" style={{ borderBottom: "none", marginTop: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>All Projects</h2>
            <div className="task-section-more" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Select a project from the sidebar to view tasks
            </div>
          </div>
          
          <div className="board-view">
            {projects.map((project) => (
              <div
                key={project._id}
                className="board-card"
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                <div className="board-card-title">{project.title}</div>
                <div className="board-card-footer" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>{project.description}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={(e) => handleDelete(e, project._id)}
                    style={{ background: "transparent", border: "1px solid #fee2e2", color: "#ef4444", padding: "0.25rem 0.75rem", borderRadius: "var(--r-xs)", fontSize: "0.75rem", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
