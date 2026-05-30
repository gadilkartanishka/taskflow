import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { fetchProjects } from "../features/projects/projectsSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const colors = ["#8b5cf6", "#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

  return (
    <aside className="sidebar">
      <div
        className="sidebar-brand"
        style={{
          padding: "1.5rem 1.1rem",
          borderBottom: "none",
          alignItems: "flex-start",
        }}
      >
        <div
          className="sidebar-brand-icon"
          style={{ borderRadius: "50%", background: "var(--accent)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
        <div>
          <div className="sidebar-brand-name" style={{ color: "var(--text)" }}>
            TaskFlow
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              marginTop: "2px",
            }}
          >
            Project & task management
          </div>
        </div>
      </div>

      <div className="sidebar-section-label">PROJECTS</div>
      <div className="sidebar-nav">
        {projects.map((project, index) => {
          const color = colors[index % colors.length];
          const isActive = location.pathname.includes(`/projects/${project._id}`);
          return (
            <button
              key={project._id}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => navigate(`/projects/${project._id}`)}
              style={{ alignItems: "flex-start", padding: "0.75rem" }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: color,
                  marginTop: "6px",
                  flexShrink: 0,
                }}
              ></div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: isActive ? "var(--text)" : "var(--text-secondary)",
                  }}
                >
                  {project.title}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-item" onClick={handleLogout}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.name?.charAt(0)}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name" style={{ color: "var(--text)" }}>
              {user?.name}
            </div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
