# Hospital-Management-System-Application

A full-stack web application for managing hospital operations, built using FastAPI for the backend and React for the frontend. The system enables efficient handling of doctors, patients, and appointments through a structured and scalable architecture.

## Overview

This project demonstrates a complete full-stack implementation with RESTful APIs and a responsive frontend. It is designed to manage hospital workflows such as doctor registration, patient records, and appointment scheduling.

## Tech Stack

Frontend:
- React (JavaScript)
- Axios
- CSS

Backend:
- FastAPI (Python)
- SQLAlchemy
- SQLite

## Features

- User authentication (login system)
- Doctor management (add, view, delete)
- Patient management (add, view, delete)
- Appointment booking and tracking
- Appointment cancellation
- REST API integration between frontend and backend

## Project Structure


Hospital-Management-System/
│
├── backend/
│ └── healthcare-backend-architecture/
│ ├── models/
│ ├── routers/
│ ├── schemas/
│ ├── main.py
│ ├── database.py
│ ├── requirements.txt
│ └── healthcare.db
│
├── hospital-frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
│
├── .gitignore
└── README.md


## Installation and Setup

### Backend Setup

Navigate to backend directory:


cd backend/healthcare-backend-architecture


Create virtual environment:


python -m venv venv


Activate environment:

Windows:

venv\Scripts\activate


Install dependencies:


pip install -r requirements.txt


Run backend server:


uvicorn main:app --reload


Backend runs at:

http://127.0.0.1:8000


---

### Frontend Setup

Navigate to frontend directory:


cd hospital-frontend


Install dependencies:


npm install


Start frontend:


npm start


Frontend runs at:

http://localhost:3000


---

## API Endpoints

Doctors:
- GET /doctors
- POST /doctors
- DELETE /doctors/{id}

Patients:
- GET /patients
- POST /patients
- DELETE /patients/{id}

Appointments:
- GET /appointments
- POST /appointments
- PUT /appointments/{id}/cancel

---

## Configuration

Ensure the frontend API base URL is correctly set:

Example:


baseURL: "http://127.0.0.1:8000
"


---

## Screenshots

(Add application screenshots here such as login page, dashboard, doctor and patient management UI.)

---

## Notes

- Backend must be running before starting frontend.
- SQLite is used for development purposes.
- Ensure all dependencies are installed before running the application.

---
