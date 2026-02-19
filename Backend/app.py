from flask import Flask, request, jsonify
from flask_cors import CORS # allows Cross-Origin Resource Sharing for all routes 
from .database import init_db
from .services import fetch_expenses, add_expense



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


@app.route('/api/expenses', methods=['POST']) # API endpoint to add a new expense
def create_expense():

    data = request.get_json() #get the JSON data from the request body

    if not data:# validate that data is provided in the request body
        return jsonify({"error": "No data provided"}), 400

    required_fields = ["date", "category", "description", "amount"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    try: #adds the new expense to the database
        expense_id = add_expense(
            data["date"],
            data["category"],
            data["description"],
            float(data["amount"])
        )

        return jsonify({
            "message": "Expense created successfully",
            "id": expense_id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

