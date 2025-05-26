import React, { useState } from "react";

const LoginForm: React.FC<{ onLogin: (role: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just pass the role to the parent
    onLogin(role);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="hr">HR</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;