import sys 
import os
import pytest

# Add the project root directory to Python's module search path
# This lets pytest import the Backend package when running tests from the root folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from Backend.app import app



@pytest.fixture
def client():
    app.config['TESTING'] = True

    with app.test_client() as client:
        yield client


def test_get_expenses(client):
    response = client.get("/api/expenses")
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_create_expense_success(client):
    data = {
        "date": "2026-02-18",
        "category": "Food",
        "description": "Lunch",
        "amount": 12.50
    }

    response = client.post("/api/expenses", json=data)

    assert response.status_code == 201
    json_data = response.get_json()

    assert "id" in json_data
    assert json_data["message"] == "Expense created successfully"


def test_create_expense_missing_field(client):
    data = {
        "date": "2026-02-18",
        "category": "Food"
    }

    response = client.post("/api/expenses", json=data)

    assert response.status_code == 400


def test_delete_expense_success(client):

    response = client.post("/api/expenses",json={
        "date": "2026-02-18",
        "category": "Food",
        "description": "Lunch",
        "amount": 12.50
    })

    assert response.status_code == 201
    expense_id = response.get_json ()["id"]

    delete_response = client.delete(f'/api/expenses/{expense_id}')


    assert delete_response.status_code == 200
    json_delete_response = delete_response.get_json()
    assert json_delete_response ["message"] =="Expense successfully deleted"

def test_update_expense_success(client):

#create an expense to update
    response = client.post("/api/expenses",json={
        "date": "2026-02-18",
        "category": "Food",
        "description": "Lunch",
        "amount": 12.50
    })

    assert response.status_code == 201
    expense_id = response.get_json ()["id"]

#update the expense
    update_response = client.put(f'/api/expenses/{expense_id}', json={
        "date": "2026-02-19",
        "category": "Food",
        "description": "Dinner",
        "amount": 15.00
    })

    assert update_response.status_code == 200
    json_update_response = update_response.get_json()
    assert json_update_response ["message"] =="Expense successfully updated"
   