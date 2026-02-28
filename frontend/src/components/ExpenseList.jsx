function ExpenseList({ expenses, onDelete}){
    if (expenses.length === 0){
        return <p> No Expenses Yet</p>
    }
    
    return(
        <ul>
            {expenses.map(expense=>(
                <li key={expense.id}>
                    {expense.date} | {expense.category} | {expense.description} | £{expense.amount}
                    <button onClick={() => onDelete(expense.id)}
                        style={{backgroundColor:"#dc3545" }}
                    >
                    Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ExpenseList;