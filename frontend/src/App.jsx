import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/expenses")
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div >
      <h1>Expense Tracker</h1>

      <h2>All Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              {expense.date} | {expense.category} | {expense.description} | £{expense.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;