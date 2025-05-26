import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('HR');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;