import React, { useState } from "react";
import UserInputForm from "../UserInput/UserInputForm";
import EmployeeManagement from "../Employee/EmployeeManagement";
import InventoryManagement from "../InventoryManagement/InventoryManagement";
import OrderManagement from "../OrderManagement/OrderManagement";
import ProductionManagement from "../ProductionManagement/ProductionManagement";
import SalesManagement from "components/SalesManagement/SalesManagement";
import FinanceManagement from "components/FinanceManagement/FinanceManagement";
import AccountingManagement from "components/AccountingManagement/AccountingManagement";
interface AdminDashboardProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}

const modules = [
  { key: "user", label: "User Management", component: <UserInputForm /> },
  { key: "employee", label: "Employee Management", component: <EmployeeManagement /> },
  { key: "inventory", label: "Inventory Management", component: <InventoryManagement /> },
  { key: "order", label: "Order Management", component: <OrderManagement /> },
  { key: "production", label: "Production Management", component: <ProductionManagement /> },
  { key: "sales", label: "Sales Management", component: <SalesManagement /> },
  { key: "finance", label: "Finance Management", component: <FinanceManagement /> },
  { key: "accounting", label: "Accounting Management", component: <AccountingManagement /> },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode, setDarkMode, onLogout }) => {
  const [activeModule, setActiveModule] = useState<string>("user");

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <button
          onClick={() => setDarkMode(dm => !dm)}
          style={{ marginBottom: 32, fontWeight: 600 }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {modules.map(mod => (
          <button
            key={mod.key}
            className={activeModule === mod.key ? "active" : ""}
            onClick={() => setActiveModule(mod.key)}
          >
            {mod.label}
          </button>
        ))}
        <button
          onClick={onLogout}
          style={{
            marginTop: "auto",
            background: "#e74c3c",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 0,
          }}
        >
          Logout
        </button>
      </nav>
      <main className="dashboard-content">
        <h2>Admin Dashboard</h2>
        <section className="dashboard-section" style={{ width: "100%", maxWidth: 900 }}>
          {modules.find(mod => mod.key === activeModule)?.component}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;