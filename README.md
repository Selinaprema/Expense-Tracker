# Expense Tracker Dashboard

A full-stack Expense Tracker application built with React (Vite), Flask, SQLite, and Recharts.

The app allows users to:

- Add expenses
- Edit expenses
- Delete expenses
- View total spending
- View category breakdown in a bar chart

## Tech Stack

### Frontend
- React (Vite)
- Recharts
- CSS 

### Backend
- Flask
- Flask-CORS
- SQLite
- Pandas (for data summarisation)


# Installation & Setup Guide

## Prerequisites

Before running this project, make sure you have the following installed:

### Backend Requirements
- Python 3.10+
- pip (comes with Python)
- Virtual environment support (`venv`)

### Frontend Requirements
- Node.js (v18+ recommended)
- npm (comes with Node)


## 1. Clone The Repository

```bash
git clone https://github.com/selinaprema/Expense-Tracker.git
cd Expense-Tracker
```

# Backend Setup (Flask)

## 2. Create A Virtual Environment

From the project root:
```bash
python3 -m venv venv
```

## 3. Activate it: 
(Mac/Linux):
```bash
source venv/bin/activate
```

(Windows):
```bash
venv\Scripts\activate
```

## 4. Install Backend Dependencies:
```bash
pip install flask flask-cors pandas 
```

## 5. Run Backend Server:
From Project Root:
```bash
python3 -m Backend.app
```
Backend runs at:
```bash
http://127.0.0.1:5000
```

# Frontend Setup (React)

## 6. Navigate To Frontend

From the project root:
```bash
cd frontend
```

## 7. Install Dependencies

From the project root:
```bash
npm install
```
## 8. Run Frontend Dev Server
```bash
npm run dev
```
Frontend runs at:
```bash
http://localhost:5173
```
### Features
- Responsive dashboard layout
- Expense cards UI
- Real-time total calculation
- Category breakdown chart

### Project Structure
```
Expense-Tracker/
│
├── Backend/
│   ├── app.py
│   ├── services.py
│   ├── database.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   ├── package.json
│
└── README.md
```

### Screenshot

![Expense Tracker Screenshot](https://github.com/Selinaprema/Expense-Tracker/blob/102f35513cfb76e94ba55de9c500fd48aeb22cec/Expense%20Tracker%20Screenshot.png)


