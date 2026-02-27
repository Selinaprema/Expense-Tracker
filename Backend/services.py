from .database import get_db_connection


def fetch_expenses():
    """Fetches all expenses from the database.
    
    Returns:
        A list of expenses, where each expense is represented as a dictionary.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM expenses') # execute a query to fetch all expenses from the database

    rows = cursor.fetchall()

    expenses = [dict(row) for row in rows] # Convert each row to a dictionary for JSON  compatibility

    conn.close()
    return expenses

def add_expense(date, category, description, amount):
    """
    Inserts a new expense into the database.

    Parameters:
        date (str): The date of the expense
        category (str): Expense category
        description (str): Description of the expense
        amount (float): Amount spent

    Returns:
        The ID of the newly inserted expense.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO expenses (date, category, description, amount)
        VALUES (?, ?, ?, ?)
    ''', (date, category, description, amount))

    conn.commit()
    expense_id = cursor.lastrowid
    conn.close()

    return expense_id

def delete_expense(expense_id):
    """deletes an expense from the database based on the  expense ID.

    Parameters:
        expense_id (int): The ID of the expense to be deleted   

        Returns:  True if an expense was deleted, False otherwise.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
          "DELETE FROM expenses WHERE id = ?",
        (expense_id,)
     )

    conn.commit()

    # rowcount tells us how many rows were affected
    deleted = cursor.rowcount > 0

    conn.close()
    return deleted

def update_expense(expense_id, date, category, description, amount):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE expenses
        SET date = ?, category = ?, description = ?, amount = ?
        WHERE id = ?
    """, (date, category, description, amount, expense_id))

    conn.commit()

    updated = cursor.rowcount > 0

    conn.close()
    return updated
