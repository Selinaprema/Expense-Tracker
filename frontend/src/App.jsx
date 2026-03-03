import { useEffect, useState } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);

  // Fetch expenses from the backend API
  const fetchExpenses = () => {
    fetch("http://127.0.0.1:5000/api/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  // Fetch summary data for total and category breakdown
  const fetchSummary = () => {
    fetch("http://127.0.0.1:5000/api/expenses/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));
  };

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  // Add new expense
  const handleAdd = (newExpense) => {
    fetch(`http://127.0.0.1:5000/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newExpense,
        amount: parseFloat(newExpense.amount),
      }),
    })
      .then(() => {
        fetchExpenses();
        fetchSummary();
      })
      .catch((err) => console.error("Error adding", err));
  };

  // Delete expense
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/api/expenses/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchExpenses();
        fetchSummary();
      })
      .catch((err) => console.error("Error delting", err));
  };

  // Update expense
  const handleUpdate = (id, updatedData) => {
    fetch(`http://127.0.0.1:5000/api/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedData,
        amount: parseFloat(updatedData.amount),
      }),
    })
      .then(() => {
        fetchExpenses();
        fetchSummary();
      })
      .catch((err) => console.error("Error updating", err));
  };

  // Render the interface
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <h1>Expense Tracker</h1>
      </div>

      <div className="dashboard">
        <div className="left-column">
          <div className="card">
            <AddExpense onAdd={handleAdd} />
          </div>

          <div className="card">
            <h2>Expense List</h2>
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        </div>

        <div className="right-column">
          <div className="card">
            {summary && ( // Summary section with total and chart, only rendered if summary data is available
              <>
                <ExpenseChart data={summary.by_category} />
                <h3 className="total-text">
                  {" "}
                  Total Spent: £{summary.total.toFixed(2)}
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
