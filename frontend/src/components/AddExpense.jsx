import { useState } from "react";

function AddExpenseForm({ onExpenseAdded }) {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    description: "",
    amount: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        amount: parseFloat(formData.amount)
      })
    })
      .then(response => response.json())
      .then(() => {
        onExpenseAdded(); // Tell parent to refresh list
        setFormData({
          date: "",
          category: "",
          description: "",
          amount: ""
        });
      })
      .catch(error => console.error("Error adding expense:", error));
  };

  return (
    <>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddExpenseForm;