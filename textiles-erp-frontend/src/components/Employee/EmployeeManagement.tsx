import React, { useState } from "react";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  salary: number;
  assignedJob: string;
  dateOfHire: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState<number>(0);
  const [assignedJob, setAssignedJob] = useState("");
  const [dateOfHire, setDateOfHire] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !name || !department || !salary || !assignedJob || !dateOfHire) return;
    if (editId !== null) {
      setEmployees(employees.map(emp =>
        emp.id === editId
          ? { ...emp, employeeId, name, department, salary, assignedJob, dateOfHire }
          : emp
      ));
      setEditId(null);
    } else {
      setEmployees([
        ...employees,
        {
          id: Date.now(),
          employeeId,
          name,
          department,
          salary,
          assignedJob,
          dateOfHire,
        },
      ]);
    }
    setEmployeeId("");
    setName("");
    setDepartment("");
    setSalary(0);
    setAssignedJob("");
    setDateOfHire("");
  };

  const handleEdit = (emp: Employee) => {
    setEditId(emp.id);
    setEmployeeId(emp.employeeId);
    setName(emp.name);
    setDepartment(emp.department);
    setSalary(emp.salary);
    setAssignedJob(emp.assignedJob);
    setDateOfHire(emp.dateOfHire);
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    if (editId === id) {
      setEditId(null);
      setEmployeeId("");
      setName("");
      setDepartment("");
      setSalary(0);
      setAssignedJob("");
      setDateOfHire("");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h3>Employee Management</h3>
      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={e => setSalary(Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Assigned Job"
          value={assignedJob}
          onChange={e => setAssignedJob(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateOfHire}
          onChange={e => setDateOfHire(e.target.value)}
          required
        />
        <button type="submit">{editId !== null ? "Update" : "Add"} Employee</button>
        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setEmployeeId("");
              setName("");
              setDepartment("");
              setSalary(0);
              setAssignedJob("");
              setDateOfHire("");
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Employee ID</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Department</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Salary</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Assigned Job</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Date of Hire</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.employeeId}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.name}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.department}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{emp.salary}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.assignedJob}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.dateOfHire}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button style={{ marginLeft: 5 }} onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;