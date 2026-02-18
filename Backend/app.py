from flask import Flask, request, jsonify
from flask_cors import CORS # allows Cross-Origin Resource Sharing for all routes 
from database import init_db
from services import fetch_expenses

app = Flask(__name__) #creates a Flask application instance
CORS(app)  
init_db()  

@app.route("/")
def home():
    return jsonify({"message": "Expense Tracker API Running"}) #returns a JSON response showing that the server is running

@app.route('/api/expenses', methods=['GET']) # API endpoint to get expenses
def get_expense():  
    expenses = fetch_expenses() #fetches expenses from the database 
    return jsonify(expenses) #returns the expenses as a JSON response

if __name__ == '__main__':
    app.run(debug=True) #runs the Flask application in debug mode so I can see any error messagges
