import sys 
import os
import pytest

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
