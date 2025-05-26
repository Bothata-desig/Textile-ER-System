import React, { useState, useEffect } from "react";
import LoginForm from "./components/Auth/LoginForm";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import HRDashboard from "./components/Dashboard/HRDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import "./styles/Style.css";

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogout = () => setRole(null);

  if (!role) {
    return (
      <div className="centered-container">
        <div className="dashboard-container">
            <button
        onClick={() => setDarkMode(dm => !dm)}
        style={{
          padding: "10px 22px",
          borderRadius: "6px",
          background: darkMode ? "#e0e6f0" : "#2a3b4c",
          color: darkMode ? "#232a36" : "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s"
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
          <LoginForm onLogin={setRole} />
           
        </div>
      </div>
    );
  }

  return (
    <div>
      {role === "admin" && (
        <AdminDashboard darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />
      )}
      {role === "hr" && (
        <HRDashboard darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />
      )}
      {role === "user" && (
        <UserDashboard darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;