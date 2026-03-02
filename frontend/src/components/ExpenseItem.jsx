import { useState } from "react";
import EditExpense from "./EditExpense";

// This component represents a single expense item in the list, allowing for editing and deletion. receiving expense data and handlers as props from the parent component.
function ExpenseItem({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li style={{ marginBottom: "10px" }}>
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
          {expense.date} | {expense.category} | {expense.description} | £{expense.amount}

          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: "10px", backgroundColor: "#007bff", color: "white" }}
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(expense.id)}
            style={{ marginLeft: "5px", backgroundColor: "#dc3545", color: "white" }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default ExpenseItem;