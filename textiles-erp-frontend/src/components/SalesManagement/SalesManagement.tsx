import React, { useState } from "react";

interface Sale {
  customer: string;
  contact: string;
  product: string;
  quantity: number;
  amount: number;
  date: string;
}

const SalesManagement: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customer, setCustomer] = useState("");
  const [contact, setContact] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrEditSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !contact.trim() || !product.trim() || quantity <= 0 || amount <= 0 || !date) return;

    if (editIndex !== null) {
      // Edit existing sale
      const updated = [...sales];
      updated[editIndex] = { customer: customer.trim(), contact: contact.trim(), product: product.trim(), quantity, amount, date };
      setSales(updated);
      setEditIndex(null);
    } else {
      // Add new sale
      setSales([...sales, { customer: customer.trim(), contact: contact.trim(), product: product.trim(), quantity, amount, date }]);
    }
    setCustomer("");
    setContact("");
    setProduct("");
    setQuantity(1);
    setAmount(0);
    setDate("");
  };

  const handleEdit = (idx: number) => {
    const sale = sales[idx];
    setCustomer(sale.customer);
    setContact(sale.contact);
    setProduct(sale.product);
    setQuantity(sale.quantity);
    setAmount(sale.amount);
    setDate(sale.date);
    setEditIndex(idx);
  };

  const handleDelete = (idx: number) => {
    setSales(sales.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setCustomer("");
      setContact("");
      setProduct("");
      setQuantity(1);
      setAmount(0);
      setDate("");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Sales Management</h3>
      <form onSubmit={handleAddOrEditSale}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={e => setProduct(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          min={1}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          min={0}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editIndex !== null ? "Update Sale" : "Add Sale"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditIndex(null);
              setCustomer("");
              setContact("");
              setProduct("");
              setQuantity(1);
              setAmount(0);
              setDate("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Customer</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Contact</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Product</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Quantity</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{sale.date}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{sale.customer}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{sale.contact}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{sale.product}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{sale.quantity}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{sale.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {sales.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No sales found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesManagement;