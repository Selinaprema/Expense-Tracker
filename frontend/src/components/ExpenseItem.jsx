import { useState } from "react";
import EditExpense from "./EditExpense";


// This component represents a single expense item in the list, allowing for editing and deletion. receiving expense data and handlers as props from the parent component.
function ExpenseItem({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="expense-card">
  {isEditing ? (
    <EditExpense
      expense={expense}
      onUpdate={(id, data) => {
        onUpdate(id, data);
        setIsEditing(false);
      }}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <>
      <div className="expense-left">
        <h3 className="expense-title">
          {expense.description}
        </h3>

        <p className="expense-category">
          {expense.category}
        </p>
      </div>

      <div className="expense-right">
        <div className="expense-amount">
          £{expense.amount}
        </div>

        <div className="expense-date">
          {expense.date}
        </div>

        <div className="expense-actions">
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )}
</li>
  );
}

export default ExpenseItem;