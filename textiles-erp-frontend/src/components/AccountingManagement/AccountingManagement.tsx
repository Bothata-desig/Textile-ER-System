import React, { useState } from "react";

// --- Data Models ---
interface GLTransaction {
  id: number;
  date: string;
  description: string;
  account: string;
  debit: number;
  credit: number;
  currency: string;
  entity: string;
}

interface Payable {
  id: number;
  vendor: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
}

interface Receivable {
  id: number;
  customer: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: "Pending" | "Received" | "Overdue";
}

interface BankReconciliation {
  id: number;
  statementDate: string;
  bankBalance: number;
  bookBalance: number;
  difference: number;
  notes: string;
}

interface Asset {
  id: number;
  name: string;
  value: number;
  acquisitionDate: string;
  depreciation: number;
  status: "Active" | "Disposed";
}

interface TaxRecord {
  id: number;
  type: string;
  amount: number;
  period: string;
  status: "Filed" | "Pending";
}

interface Budget {
  id: number;
  category: string;
  planned: number;
  actual: number;
  period: string;
}

interface AuditLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

// --- Helper functions for status casting ---
const toPayableStatus = (value: string): Payable["status"] => {
  if (value === "Pending" || value === "Paid" || value === "Overdue") return value;
  return "Pending";
};
const toReceivableStatus = (value: string): Receivable["status"] => {
  if (value === "Pending" || value === "Received" || value === "Overdue") return value;
  return "Pending";
};
const toAssetStatus = (value: string): Asset["status"] => {
  if (value === "Active" || value === "Disposed") return value;
  return "Active";
};
const toTaxStatus = (value: string): TaxRecord["status"] => {
  if (value === "Filed" || value === "Pending") return value;
  return "Pending";
};

// --- Main Component ---
const AccountingManagement: React.FC = () => {
  // General Ledger (GL)
  const [glTransactions, setGLTransactions] = useState<GLTransaction[]>([]);
  const [glForm, setGLForm] = useState<Omit<GLTransaction, "id">>({
    date: "",
    description: "",
    account: "",
    debit: 0,
    credit: 0,
    currency: "",
    entity: "",
  });

  // Accounts Payable (AP)
  const [payables, setPayables] = useState<Payable[]>([]);
  const [payableForm, setPayableForm] = useState<Omit<Payable, "id">>({
    vendor: "",
    invoiceNumber: "",
    amount: 0,
    dueDate: "",
    status: "Pending",
  });

  // Accounts Receivable (AR)
  const [receivables, setReceivables] = useState<Receivable[]>([]);
  const [receivableForm, setReceivableForm] = useState<Omit<Receivable, "id">>({
    customer: "",
    invoiceNumber: "",
    amount: 0,
    dueDate: "",
    status: "Pending",
  });

  // Bank Reconciliation
  const [bankRecs, setBankRecs] = useState<BankReconciliation[]>([]);
  const [bankRecForm, setBankRecForm] = useState<Omit<BankReconciliation, "id">>({
    statementDate: "",
    bankBalance: 0,
    bookBalance: 0,
    difference: 0,
    notes: "",
  });

  // Asset Management
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetForm, setAssetForm] = useState<Omit<Asset, "id">>({
    name: "",
    value: 0,
    acquisitionDate: "",
    depreciation: 0,
    status: "Active",
  });

  // Tax Management
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
  const [taxForm, setTaxForm] = useState<Omit<TaxRecord, "id">>({
    type: "",
    amount: 0,
    period: "",
    status: "Pending",
  });

  // Budgeting and Forecasting
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetForm, setBudgetForm] = useState<Omit<Budget, "id">>({
    category: "",
    planned: 0,
    actual: 0,
    period: "",
  });

  // Audit Trail
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // --- Insert Handlers ---
  const handleAddGL = (e: React.FormEvent) => {
    e.preventDefault();
    setGLTransactions([
      ...glTransactions,
      { ...glForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add GL Transaction",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(glForm),
      },
    ]);
    setGLForm({
      date: "",
      description: "",
      account: "",
      debit: 0,
      credit: 0,
      currency: "",
      entity: "",
    });
  };

  const handleAddPayable = (e: React.FormEvent) => {
    e.preventDefault();
    setPayables([
      ...payables,
      { ...payableForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add Payable",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(payableForm),
      },
    ]);
    setPayableForm({
      vendor: "",
      invoiceNumber: "",
      amount: 0,
      dueDate: "",
      status: "Pending",
    });
  };

  const handleAddReceivable = (e: React.FormEvent) => {
    e.preventDefault();
    setReceivables([
      ...receivables,
      { ...receivableForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add Receivable",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(receivableForm),
      },
    ]);
    setReceivableForm({
      customer: "",
      invoiceNumber: "",
      amount: 0,
      dueDate: "",
      status: "Pending",
    });
  };

  const handleAddBankRec = (e: React.FormEvent) => {
    e.preventDefault();
    setBankRecs([
      ...bankRecs,
      { ...bankRecForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add Bank Reconciliation",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(bankRecForm),
      },
    ]);
    setBankRecForm({
      statementDate: "",
      bankBalance: 0,
      bookBalance: 0,
      difference: 0,
      notes: "",
    });
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    setAssets([
      ...assets,
      { ...assetForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add Asset",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(assetForm),
      },
    ]);
    setAssetForm({
      name: "",
      value: 0,
      acquisitionDate: "",
      depreciation: 0,
      status: "Active",
    });
  };

  const handleAddTax = (e: React.FormEvent) => {
    e.preventDefault();
    setTaxRecords([
      ...taxRecords,
      { ...taxForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add Tax Record",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(taxForm),
      },
    ]);
    setTaxForm({
      type: "",
      amount: 0,
      period: "",
      status: "Pending",
    });
  };

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    setBudgets([
      ...budgets,
      { ...budgetForm, id: Date.now() }
    ]);
    setAuditLogs([
      ...auditLogs,
      {
        id: Date.now(),
        action: "Add Budget",
        user: "CurrentUser",
        timestamp: new Date().toISOString(),
        details: JSON.stringify(budgetForm),
      },
    ]);
    setBudgetForm({
      category: "",
      planned: 0,
      actual: 0,
      period: "",
    });
  };

  // --- UI ---
  return (
    <div style={{ width: "100%" }}>
      <h2>Accounting Management</h2>
      
      {/* --- General Ledger Table & Form --- */}
      <h3>General Ledger</h3>
      <form onSubmit={handleAddGL} style={{ marginBottom: 12 }}>
        <input type="date" value={glForm.date} onChange={e => setGLForm(f => ({ ...f, date: e.target.value }))} required />
        <input type="text" placeholder="Description" value={glForm.description} onChange={e => setGLForm(f => ({ ...f, description: e.target.value }))} required />
        <input type="text" placeholder="Account" value={glForm.account} onChange={e => setGLForm(f => ({ ...f, account: e.target.value }))} required />
        <input type="number" placeholder="Debit" value={glForm.debit} onChange={e => setGLForm(f => ({ ...f, debit: Number(e.target.value) }))} min={0} />
        <input type="number" placeholder="Credit" value={glForm.credit} onChange={e => setGLForm(f => ({ ...f, credit: Number(e.target.value) }))} min={0} />
        <input type="text" placeholder="Currency" value={glForm.currency} onChange={e => setGLForm(f => ({ ...f, currency: e.target.value }))} required />
        <input type="text" placeholder="Entity" value={glForm.entity} onChange={e => setGLForm(f => ({ ...f, entity: e.target.value }))} required />
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Account</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Debit</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Credit</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Currency</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Entity</th>
          </tr>
        </thead>
        <tbody>
          {glTransactions.map(tx => (
            <tr key={tx.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.date}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.description}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.account}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.debit}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.credit}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.currency}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tx.entity}</td>
            </tr>
          ))}
          {glTransactions.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Accounts Payable Table & Form --- */}
      <h3>Accounts Payable</h3>
      <form onSubmit={handleAddPayable} style={{ marginBottom: 12 }}>
        <input type="text" placeholder="Vendor" value={payableForm.vendor} onChange={e => setPayableForm(f => ({ ...f, vendor: e.target.value }))} required />
        <input type="text" placeholder="Invoice #" value={payableForm.invoiceNumber} onChange={e => setPayableForm(f => ({ ...f, invoiceNumber: e.target.value }))} required />
        <input type="number" placeholder="Amount" value={payableForm.amount} onChange={e => setPayableForm(f => ({ ...f, amount: Number(e.target.value) }))} min={0} required />
        <input type="date" value={payableForm.dueDate} onChange={e => setPayableForm(f => ({ ...f, dueDate: e.target.value }))} required />
        <select
          value={payableForm.status}
          onChange={e => setPayableForm(f => ({ ...f, status: toPayableStatus(e.target.value) }))}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Vendor</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Invoice #</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Due Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {payables.map(ap => (
            <tr key={ap.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ap.vendor}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ap.invoiceNumber}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{ap.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ap.dueDate}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ap.status}</td>
            </tr>
          ))}
          {payables.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No payables found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Accounts Receivable Table & Form --- */}
      <h3>Accounts Receivable</h3>
      <form onSubmit={handleAddReceivable} style={{ marginBottom: 12 }}>
        <input type="text" placeholder="Customer" value={receivableForm.customer} onChange={e => setReceivableForm(f => ({ ...f, customer: e.target.value }))} required />
        <input type="text" placeholder="Invoice #" value={receivableForm.invoiceNumber} onChange={e => setReceivableForm(f => ({ ...f, invoiceNumber: e.target.value }))} required />
        <input type="number" placeholder="Amount" value={receivableForm.amount} onChange={e => setReceivableForm(f => ({ ...f, amount: Number(e.target.value) }))} min={0} required />
        <input type="date" value={receivableForm.dueDate} onChange={e => setReceivableForm(f => ({ ...f, dueDate: e.target.value }))} required />
        <select
          value={receivableForm.status}
          onChange={e => setReceivableForm(f => ({ ...f, status: toReceivableStatus(e.target.value) }))}
        >
          <option value="Pending">Pending</option>
          <option value="Received">Received</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Customer</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Invoice #</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Due Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {receivables.map(ar => (
            <tr key={ar.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ar.customer}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ar.invoiceNumber}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{ar.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ar.dueDate}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{ar.status}</td>
            </tr>
          ))}
          {receivables.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No receivables found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Bank Reconciliation Table & Form --- */}
      <h3>Bank Reconciliation</h3>
      <form onSubmit={handleAddBankRec} style={{ marginBottom: 12 }}>
        <input type="date" value={bankRecForm.statementDate} onChange={e => setBankRecForm(f => ({ ...f, statementDate: e.target.value }))} required />
        <input type="number" placeholder="Bank Balance" value={bankRecForm.bankBalance} onChange={e => setBankRecForm(f => ({ ...f, bankBalance: Number(e.target.value) }))} min={0} required />
        <input type="number" placeholder="Book Balance" value={bankRecForm.bookBalance} onChange={e => setBankRecForm(f => ({ ...f, bookBalance: Number(e.target.value) }))} min={0} required />
        <input type="number" placeholder="Difference" value={bankRecForm.difference} onChange={e => setBankRecForm(f => ({ ...f, difference: Number(e.target.value) }))} min={0} required />
        <input type="text" placeholder="Notes" value={bankRecForm.notes} onChange={e => setBankRecForm(f => ({ ...f, notes: e.target.value }))} />
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Statement Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Bank Balance</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Book Balance</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Difference</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {bankRecs.map(rec => (
            <tr key={rec.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{rec.statementDate}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{rec.bankBalance}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{rec.bookBalance}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{rec.difference}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{rec.notes}</td>
            </tr>
          ))}
          {bankRecs.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No bank reconciliations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Asset Management Table & Form --- */}
      <h3>Asset Management</h3>
      <form onSubmit={handleAddAsset} style={{ marginBottom: 12 }}>
        <input type="text" placeholder="Asset Name" value={assetForm.name} onChange={e => setAssetForm(f => ({ ...f, name: e.target.value }))} required />
        <input type="number" placeholder="Value" value={assetForm.value} onChange={e => setAssetForm(f => ({ ...f, value: Number(e.target.value) }))} min={0} required />
        <input type="date" value={assetForm.acquisitionDate} onChange={e => setAssetForm(f => ({ ...f, acquisitionDate: e.target.value }))} required />
        <input type="number" placeholder="Depreciation" value={assetForm.depreciation} onChange={e => setAssetForm(f => ({ ...f, depreciation: Number(e.target.value) }))} min={0} required />
        <select
          value={assetForm.status}
          onChange={e => setAssetForm(f => ({ ...f, status: toAssetStatus(e.target.value) }))}
        >
          <option value="Active">Active</option>
          <option value="Disposed">Disposed</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Asset Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Value</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Acquisition Date</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Depreciation</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{asset.name}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{asset.value}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{asset.acquisitionDate}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{asset.depreciation}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{asset.status}</td>
            </tr>
          ))}
          {assets.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No assets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Tax Management Table & Form --- */}
      <h3>Tax Management</h3>
      <form onSubmit={handleAddTax} style={{ marginBottom: 12 }}>
        <input type="text" placeholder="Type" value={taxForm.type} onChange={e => setTaxForm(f => ({ ...f, type: e.target.value }))} required />
        <input type="number" placeholder="Amount" value={taxForm.amount} onChange={e => setTaxForm(f => ({ ...f, amount: Number(e.target.value) }))} min={0} required />
        <input type="text" placeholder="Period" value={taxForm.period} onChange={e => setTaxForm(f => ({ ...f, period: e.target.value }))} required />
        <select
          value={taxForm.status}
          onChange={e => setTaxForm(f => ({ ...f, status: toTaxStatus(e.target.value) }))}
        >
          <option value="Pending">Pending</option>
          <option value="Filed">Filed</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Type</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Period</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {taxRecords.map(tax => (
            <tr key={tax.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tax.type}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{tax.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tax.period}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{tax.status}</td>
            </tr>
          ))}
          {taxRecords.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No tax records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Budgeting Table & Form --- */}
      <h3>Budgeting & Forecasting</h3>
      <form onSubmit={handleAddBudget} style={{ marginBottom: 12 }}>
        <input type="text" placeholder="Category" value={budgetForm.category} onChange={e => setBudgetForm(f => ({ ...f, category: e.target.value }))} required />
        <input type="number" placeholder="Planned" value={budgetForm.planned} onChange={e => setBudgetForm(f => ({ ...f, planned: Number(e.target.value) }))} min={0} required />
        <input type="number" placeholder="Actual" value={budgetForm.actual} onChange={e => setBudgetForm(f => ({ ...f, actual: Number(e.target.value) }))} min={0} required />
        <input type="text" placeholder="Period" value={budgetForm.period} onChange={e => setBudgetForm(f => ({ ...f, period: e.target.value }))} required />
        <button type="submit">Add</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Planned</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actual</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Period</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(budget => (
            <tr key={budget.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{budget.category}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{budget.planned}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>R{budget.actual}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{budget.period}</td>
            </tr>
          ))}
          {budgets.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No budgets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <hr style={{ margin: "32px 0" }} />

      {/* --- Audit Trail Table --- */}
      <h3>Audit Trail</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f1f3f6" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Action</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>User</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Timestamp</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.map(log => (
            <tr key={log.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{log.action}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{log.user}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{log.timestamp}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{log.details}</td>
            </tr>
          ))}
          {auditLogs.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No audit logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountingManagement;