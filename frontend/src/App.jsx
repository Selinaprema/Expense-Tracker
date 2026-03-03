import { useEffect, useState } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);

// Fetch expenses from the backend API
  const fetchExpenses = () => {
    fetch("http://127.0.0.1:5000/api/expenses")
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error("Error fetching expenses:", error));
  }
  

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);


  // Add new expense
  const handleAdd = (newExpense) =>{
    fetch(`http://127.0.0.1:5000/api/expenses`,{
      method:"POST",
      headers: { "Content-Type": "application/json"

      },
      body:JSON.stringify({
        ...newExpense,
        amount: parseFloat(newExpense.amount)

      })
    })
    .then(()=> {
     fetchExpenses();
     fetchSummary();
  })
    .catch(err => console.error("Error adding",err));
  };

  // Delete expense
  const handleDelete = (id) =>{
    fetch(`http://127.0.0.1:5000/api/expenses/${id}`,{
      method:"DELETE"
    })
    .then(()=> {
     fetchExpenses();
     fetchSummary();
  })
    .catch(err => console.error("Error delting",err));
  }

  // Update expense
  const handleUpdate = (id, updatedData) =>{
    fetch(`http://127.0.0.1:5000/api/expenses/${id}`,{
      method:"PUT",
      headers: { "Content-Type": "application/json"

      },
      body:JSON.stringify({
        ...updatedData,
        amount: parseFloat(updatedData.amount)

      })
    })
    .then(()=> {
     fetchExpenses();
     fetchSummary();
  })
    .catch(err => console.error("Error updating",err));
  }

  // State for summary data
const [summary, setSummary] = useState(null);

// Fetch summary data for total and category breakdown
const fetchSummary = () => {
  fetch("http://127.0.0.1:5000/api/expenses/summary")
    .then(res => res.json())
    .then(data => setSummary(data))
    .catch(err => console.error("Error fetching summary:", err));
};

  // Render the interface
  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      <AddExpense onAdd={handleAdd} /> 

      <h2>All Expenses</h2>

      <ExpenseList 
        expenses={expenses}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onFetchSummary={fetchSummary}
/> 
     {summary && ( // Summary section with total and chart, only rendered if summary data is available
    <>
      <h2>Total Spent: £{summary.total}</h2>
      <ExpenseChart data={summary.by_category} />
    </>
)}
    </div>
    
  );
}

export default App;
