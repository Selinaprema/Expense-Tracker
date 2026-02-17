import sqlite3

DATABASE = 'expenses.db' # Database file name

def get_db_connection():
    """Establishes a connection to the SQLite database."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  
    return conn
    
def init_db():
    """Initializes the database with the required tables."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create the expenses table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        )
    ''')
    
    conn.commit()
    conn.close()