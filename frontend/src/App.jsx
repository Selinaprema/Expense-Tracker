import { useEffect, useState } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

// Fetch expenses from the backend API
  const fetchExpenses = () => {
    fetch("http://127.0.0.1:5000/api/expenses")
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error("Error fetching expenses:", error));
  };

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  //delete an expense
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/api/expenses/${id}`, {
      method: 'DELETE'
    })
    .then(() => fetchExpenses())
    .catch(error => console.error('Error deleting expense:', error));
  }

  // Render the interface
  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      <AddExpense onExpenseAdded={fetchExpenses} /> 

      <h2>All Expenses</h2>

    <ExpenseList 
      expenses={expenses}
      onDelete={handleDelete}
/>
    </div>
  );
}

export default App;
