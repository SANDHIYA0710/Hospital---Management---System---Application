from fastapi import FastAPI
from database import Base, engine

# models
from models import doctor, patient, appointment, files

# routers
from routers import auth
from routers import doctor
from routers import patient
from routers import appointment
from routers import files

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Doctor & Patient Management API",
    description="Advanced FastAPI Assignment - End to End",
    version="1.0.0"
)

# Order matters here

app.include_router(auth.router)         # 1 Authentication
app.include_router(doctor.router)       # 2 Doctors
app.include_router(patient.router)      # 3 Patients
app.include_router(appointment.router)  # 4 Appointments
app.include_router(files.router)        # 5 Patient Files

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}