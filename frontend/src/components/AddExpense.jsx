import { useState } from "react";
import "../App.css";

//Function to add new expenses, receiving the add handler as a prop from the parent component
function AddExpenseForm({ onAdd }) {
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

    onAdd(formData); // Call parent handler to add expense

    setFormData({ // Reset form after submission
      date: "",
      category: "",
      description: "",
      amount: ""
    });
  };

  return ( 
    <>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <button type="submit" className="add-btn">Add</button>
      </form>
    </>
  );
}

export default AddExpenseForm;