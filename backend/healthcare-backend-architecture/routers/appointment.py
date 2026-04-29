from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.appointment import Appointment
from schemas.appointment import AppointmentCreate

router = APIRouter(prefix="/appointments", tags=["Appointments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):
    app = Appointment(
        patient_name=data.patient_name,
        doctor_name=data.doctor_name,
        date=data.date
    )
    db.add(app)
    db.commit()
    return {"message": "Appointment Created"}

@router.get("/")
def get_apps(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

@router.get("/{appointment_id}")
def get_app(appointment_id: int, db: Session = Depends(get_db)):
    return db.query(Appointment).filter(Appointment.id == appointment_id).first()

@router.put("/{appointment_id}/cancel")
def cancel(appointment_id: int, db: Session = Depends(get_db)):
    app = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    app.status = "Cancelled"
    db.commit()
    return {"message": "Cancelled"}