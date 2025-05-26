import React, { useState } from "react";

// Example user and activity types
interface User {
  id: number;
  name: string;
  department: string;
  role: string;
  email: string;
}

interface Activity {
  id: number;
  department: string;
  description: string;
  date: string;
}

// Example: Simulated user and activities data
const currentUser: User = {
  id: 1,
  name: "Jane Doe",
  department: "Finance",
  role: "Accountant",
  email: "jane.doe@company.com",
};

const allActivities: Activity[] = [
  { id: 1, department: "Finance", description: "Processed payroll", date: "2025-05-01" },
  { id: 2, department: "Sales", description: "Closed a major deal", date: "2025-05-02" },
  { id: 3, department: "Finance", description: "Submitted tax returns", date: "2025-05-03" },
  { id: 4, department: "HR", description: "Conducted interviews", date: "2025-05-04" },
  { id: 5, department: "Finance", description: "Updated budget forecast", date: "2025-05-05" },
];

// ...existing code...

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>(currentUser);
  const [editMode, setEditMode] = useState(false);

  // ...departmentActivities as before...

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    // In a real app, save user details to backend here
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>User Profile</h2>
      {editMode ? (
        <form onSubmit={handleSave} style={{ marginBottom: 24, border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
          <div>
            <label>
              <strong>Name:</strong>
              <input name="name" value={user.name} onChange={handleChange} required style={{ marginLeft: 8 }} />
            </label>
          </div>
          <div>
            <label>
              <strong>Department:</strong>
              <select name="department" value={user.department} onChange={handleChange} required style={{ marginLeft: 8 }}>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                {/* Add more departments as needed */}
              </select>
            </label>
          </div>
          <div>
            <label>
              <strong>Role:</strong>
              <input name="role" value={user.role} onChange={handleChange} required style={{ marginLeft: 8 }} />
            </label>
          </div>
          <div>
            <label>
              <strong>Email:</strong>
              <input name="email" value={user.email} onChange={handleChange} required style={{ marginLeft: 8 }} />
            </label>
          </div>
          <button type="submit" style={{ marginTop: 12 }}>Save</button>
          <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: 8 }}>Cancel</button>
        </form>
      ) : (
        <div style={{ marginBottom: 24, border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
          <strong>Name:</strong> {user.name} <br />
          <strong>Department:</strong> {user.department} <br />
          <strong>Role:</strong> {user.role} <br />
          <strong>Email:</strong> {user.email}
          <br />
          <button onClick={() => setEditMode(true)} style={{ marginTop: 12 }}>Edit Profile</button>
        </div>
      )}

      {/* ...activities table as before... */}
    </div>
  );
};


export default UserProfile;