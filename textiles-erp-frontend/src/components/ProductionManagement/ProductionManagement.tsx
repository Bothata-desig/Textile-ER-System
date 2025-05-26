import React, { useState } from "react";

interface ProductionTask {
  task: string;
  status: "Pending" | "In Progress" | "Completed";
  expectedDueDate: string;
  quantityExpected: number;
}

const toStatus = (value: string): ProductionTask["status"] => {
  if (value === "Pending" || value === "In Progress" || value === "Completed") {
    return value;
  }
  return "Pending";
};

const ProductionManagement: React.FC = () => {
  const [tasks, setTasks] = useState<ProductionTask[]>([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState<ProductionTask["status"]>("Pending");
  const [expectedDueDate, setExpectedDueDate] = useState("");
  const [quantityExpected, setQuantityExpected] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !expectedDueDate || quantityExpected <= 0) return;
    const newTask: ProductionTask = {
      task: task.trim(),
      status,
      expectedDueDate,
      quantityExpected,
    };
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTask("");
    setStatus("Pending");
    setExpectedDueDate("");
    setQuantityExpected(0);
  };

  const handleEdit = (idx: number) => {
    const t = tasks[idx];
    setEditIndex(idx);
    setTask(t.task);
    setStatus(t.status);
    setExpectedDueDate(t.expectedDueDate);
    setQuantityExpected(t.quantityExpected);
  };

  const handleDelete = (idx: number) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setTask("");
      setStatus("Pending");
      setExpectedDueDate("");
      setQuantityExpected(0);
    }
  };

  const handleStatusChange = (idx: number, newStatus: ProductionTask["status"]) => {
    const updated = [...tasks];
    updated[idx].status = newStatus;
    setTasks(updated);
  };

  return (
    <div style={{ margin: "20px 0", width: "100%" }}>
      <h3>Production Management</h3>
      <form onSubmit={handleAddOrEdit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Production Task"
          value={task}
          onChange={e => setTask(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Expected Due Date"
          value={expectedDueDate}
          onChange={e => setExpectedDueDate(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Quantity Expected"
          value={quantityExpected}
          onChange={e => setQuantityExpected(Number(e.target.value))}
          min={1}
          required
          style={{ marginLeft: "10px", width: 120 }}
        />
        <select
          value={status}
          onChange={e => setStatus(toStatus(e.target.value))}
          style={{ marginLeft: "10px" }}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editIndex !== null ? "Update" : "Add"} Task
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditIndex(null);
              setTask("");
              setStatus("Pending");
              setExpectedDueDate("");
              setQuantityExpected(0);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Task</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Expected Due Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Quantity Expected</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{t.task}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{t.expectedDueDate}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{t.quantityExpected}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <select
                  value={t.status}
                  onChange={e => handleStatusChange(idx, toStatus(e.target.value))}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No production tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionManagement;