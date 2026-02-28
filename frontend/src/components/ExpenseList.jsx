import ExpenseItem from "./ExpenseItem"

function ExpenseList({ expenses, onDelete}){
    if (expenses.length === 0){
        return <p> No Expenses Yet</p>
    }
    
    return(
        <ul>
            {expenses.map(expense=>(
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={(onDelete)}
                />
            ))}
        </ul>
    );
}

export default ExpenseList;