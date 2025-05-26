import React, { useState } from "react";

interface Order {
  orderNumber: string;
  orderName: string;
  customer: string;
  product: string;
  quantity: number;
  orderDate: string;
  status: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderName, setOrderName] = useState("");
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !orderNumber.trim() ||
      !orderName.trim() ||
      !customer.trim() ||
      !product.trim() ||
      quantity <= 0 ||
      !orderDate.trim() ||
      !status.trim()
    )
      return;

    const order: Order = {
      orderNumber: orderNumber.trim(),
      orderName: orderName.trim(),
      customer: customer.trim(),
      product: product.trim(),
      quantity,
      orderDate,
      status,
    };

    if (editIndex !== null) {
      // Edit existing order
      const updated = [...orders];
      updated[editIndex] = order;
      setOrders(updated);
      setEditIndex(null);
    } else {
      // Add new order
      setOrders([...orders, order]);
    }
    setOrderNumber("");
    setOrderName("");
    setCustomer("");
    setProduct("");
    setQuantity(1);
    setOrderDate("");
    setStatus("Pending");
  };

  const handleEdit = (idx: number) => {
    const order = orders[idx];
    setEditIndex(idx);
    setOrderNumber(order.orderNumber);
    setOrderName(order.orderName);
    setCustomer(order.customer);
    setProduct(order.product);
    setQuantity(order.quantity);
    setOrderDate(order.orderDate);
    setStatus(order.status);
  };

  const handleDelete = (idx: number) => {
    setOrders(orders.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setOrderNumber("");
      setOrderName("");
      setCustomer("");
      setProduct("");
      setQuantity(1);
      setOrderDate("");
      setStatus("Pending");
    }
  };

  return (
    <div style={{ margin: "20px 0", width: "100%" }}>
      <h3>Order Management</h3>
      <form onSubmit={handleAddOrEdit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Order Number"
          value={orderNumber}
          onChange={e => setOrderNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Order Name"
          value={orderName}
          onChange={e => setOrderName(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
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
          style={{ marginLeft: "10px", width: 80 }}
        />
        <input
          type="date"
          value={orderDate}
          onChange={e => setOrderDate(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditIndex(null);
              setOrderNumber("");
              setOrderName("");
              setCustomer("");
              setProduct("");
              setQuantity(1);
              setOrderDate("");
              setStatus("Pending");
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
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Order Number</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Order Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Customer</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Product</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Quantity</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Order Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.orderNumber}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.orderName}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.customer}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.product}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.quantity}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.orderDate}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.status}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 16, fontWeight: 600 }}>Total Orders: {orders.length}</div>
    </div>
  );
};

export default OrderManagement;