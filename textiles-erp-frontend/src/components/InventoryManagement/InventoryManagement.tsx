import React, { useState } from "react";

interface InventoryItem {
  productId: string;
  name: string;
  sellerId: string;
  sellerName: string;
  sellerContact: string;
  cost: number;
  shippingCost: number;
  quantity: number;
}

const InventoryManagement: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productId.trim() ||
      !name.trim() ||
      !sellerId.trim() ||
      !sellerName.trim() ||
      !sellerContact.trim() ||
      cost <= 0 ||
      shippingCost < 0 ||
      quantity <= 0
    )
      return;

    const item: InventoryItem = {
      productId: productId.trim(),
      name: name.trim(),
      sellerId: sellerId.trim(),
      sellerName: sellerName.trim(),
      sellerContact: sellerContact.trim(),
      cost,
      shippingCost,
      quantity,
    };

    if (editIndex !== null) {
      // Edit existing item
      const updated = [...items];
      updated[editIndex] = item;
      setItems(updated);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, item]);
    }
    setProductId("");
    setName("");
    setSellerId("");
    setSellerName("");
    setSellerContact("");
    setCost(0);
    setShippingCost(0);
    setQuantity(0);
  };

  const handleEdit = (idx: number) => {
    const item = items[idx];
    setEditIndex(idx);
    setProductId(item.productId);
    setName(item.name);
    setSellerId(item.sellerId);
    setSellerName(item.sellerName);
    setSellerContact(item.sellerContact);
    setCost(item.cost);
    setShippingCost(item.shippingCost);
    setQuantity(item.quantity);
  };

  const handleDelete = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setProductId("");
      setName("");
      setSellerId("");
      setSellerName("");
      setSellerContact("");
      setCost(0);
      setShippingCost(0);
      setQuantity(0);
    }
  };

  return (
    <div style={{ margin: "20px 0", width: "100%" }}>
      <h3>Inventory Management</h3>
      <form onSubmit={handleAddOrEdit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Seller ID"
          value={sellerId}
          onChange={e => setSellerId(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Seller Name"
          value={sellerName}
          onChange={e => setSellerName(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Seller Contact"
          value={sellerContact}
          onChange={e => setSellerContact(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={e => setCost(Number(e.target.value))}
          min={0}
          required
          style={{ marginLeft: "10px", width: 90 }}
        />
        <input
          type="number"
          placeholder="Shipping Cost"
          value={shippingCost}
          onChange={e => setShippingCost(Number(e.target.value))}
          min={0}
          required
          style={{ marginLeft: "10px", width: 110 }}
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
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditIndex(null);
              setProductId("");
              setName("");
              setSellerId("");
              setSellerName("");
              setSellerContact("");
              setCost(0);
              setShippingCost(0);
              setQuantity(0);
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
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Product ID</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Item Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Seller ID</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Seller Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Seller Contact</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Cost</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Shipping Cost</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Quantity</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.productId}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.name}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.sellerId}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.sellerName}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.sellerContact}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{item.cost}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{item.shippingCost}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.quantity}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No inventory items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;