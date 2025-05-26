import React from "react";
import UserInputForm from "../UserInput/UserInputForm";
import UserProfile from "../User/UserProfile";

interface UserDashboardProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ darkMode, setDarkMode, onLogout }) => (
  <div className="dashboard-container">
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
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
      <button
        onClick={onLogout}
        style={{
          padding: "10px 22px",
          borderRadius: "6px",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
    <h2>User Dashboard</h2>
    <section className="dashboard-section">
      <UserProfile />
    </section>
    <section className="dashboard-section">
      <UserInputForm />
    </section>
    <p>Welcome, User! Here you can view your profile and tasks.</p>
  </div>
);

export default UserDashboard;