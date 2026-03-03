import { useState } from "react";

// This component is used for editing an existing expense, receivng the current expense data and update/cancel handlers as props.
function EditExpense({ expense, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    date: expense.date,
    category: expense.category,
    description: expense.description,
    amount: expense.amount
  });

  // Handle input changes and update form data state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onUpdate(expense.id, formData);
  };

  return (
    <>
      <input name="date" value={formData.date} onChange={handleChange} />
      <input name="category" value={formData.category} onChange={handleChange} />
      <input name="description" value={formData.description} onChange={handleChange} />
      <input name="amount" value={formData.amount} onChange={handleChange} />

      <button
        className="save-button" 
        onClick={handleSave}
      >
        Save
      </button>

      <button 
      className="cancel-button"
      onClick={onCancel}>
        Cancel
      </button>
    </>
  );
}

export default EditExpense;