from database import get_db_connection


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