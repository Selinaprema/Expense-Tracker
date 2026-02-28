function ExpenseItem({ expense, onDelete }) {
  return (
    <li>
      {expense.date} | {expense.category} | {expense.description} | £{expense.amount}

      <button
        onClick={() => onDelete(expense.id)}
        style={{
          backgroundColor: "#dc3545",
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default ExpenseItem;