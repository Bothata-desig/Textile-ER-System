import React, { useState } from "react";

interface FinanceRecord {
  id: number;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  date: string;
}

const toFinanceType = (value: string): "Income" | "Expense" =>
  value === "Income" ? "Income" : "Expense";

const FinanceManagement: React.FC = () => {
  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<FinanceRecord["type"]>("Income");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;
    if (editId !== null) {
      setRecords(records.map(rec =>
        rec.id === editId
          ? { ...rec, description, amount, type, date }
          : rec
      ));
      setEditId(null);
    } else {
      setRecords([
        ...records,
        {
          id: Date.now(),
          description,
          amount,
          type,
          date,
        },
      ]);
    }
    setDescription("");
    setAmount(0);
    setType("Income");
    setDate("");
  };

  const handleEdit = (rec: FinanceRecord) => {
    setEditId(rec.id);
    setDescription(rec.description);
    setAmount(rec.amount);
    setType(rec.type);
    setDate(rec.date);
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter(rec => rec.id !== id));
    if (editId === id) {
      setEditId(null);
      setDescription("");
      setAmount(0);
      setType("Income");
      setDate("");
    }
  };

  const totalIncome = records
    .filter(r => r.type === "Income")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = records
    .filter(r => r.type === "Expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const profitOrLoss = totalIncome - totalExpenses;
  const hasProfit = profitOrLoss > 0;
  const hasLoss = profitOrLoss < 0;

  return (
    <div style={{ width: "100%" }}>
      <h3>Finance Management</h3>
      <div style={{ display: "flex", gap: 40, marginBottom: 24 }}>
        <div style={{ fontWeight: 600, color: "#2a8f4c" }}>
          Total Income: R{totalIncome}
        </div>
        <div style={{ fontWeight: 600, color: "#e74c3c" }}>
          Total Expenses: R{totalExpenses}
        </div>
        {hasProfit && (
          <div style={{ fontWeight: 600, color: "#1abc9c" }}>
            Total Profit: R{profitOrLoss}
          </div>
        )}
        {hasLoss && (
          <div style={{ fontWeight: 600, color: "#c0392b" }}>
            Total Loss: R{Math.abs(profitOrLoss)}
          </div>
        )}
      </div>
      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          required
        />
        <select value={type} onChange={e => setType(toFinanceType(e.target.value))}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button type="submit">{editId !== null ? "Update" : "Add"} Record</button>
        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setDescription("");
              setAmount(0);
              setType("Income");
              setDate("");
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Type</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(rec => (
            <tr key={rec.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{rec.type}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{rec.description}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{rec.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{rec.date}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <button style={{ marginRight: 5 }} onClick={() => handleEdit(rec)}>
                  Edit
                </button>
                <button style={{ marginLeft: 5 }} onClick={() => handleDelete(rec.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceManagement;