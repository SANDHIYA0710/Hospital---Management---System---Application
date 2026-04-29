from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.doctor import Doctor
from schemas.doctor import DoctorCreate

# ✅ ADD THIS
from pydantic import BaseModel


router = APIRouter(
    prefix="/doctors", 
    tags=["Doctors"]
)


# ✅ CREATE (OLD - QUERY PARAMS, KEEP AS IT IS)
@router.post("/")
def create_doctor(data: DoctorCreate, db: Session = Depends(get_db)):
    doctor = Doctor(
        name=data.name,
        specialization=data.specialization,
        experience=data.experience,
        email=data.email,
        is_active=True
    )

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return doctor


# ✅ NEW CREATE (JSON BODY SUPPORT - ADDED)
@router.post("/json")
def create_doctor_json(doctor: DoctorCreate, db: Session = Depends(get_db)):
    new_doctor = Doctor(
        name=doctor.name,
        specialization=doctor.specialization,
        experience=doctor.experience
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor


# ✅ GET ALL
@router.get("/")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()


# ✅ GET ONE
@router.get("/{doctor_id}")
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return doctor


# ✅ UPDATE
@router.put("/{doctor_id}")
def update_doctor(doctor_id: int, name: str, specialization: str, experience: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    doctor.name = name
    doctor.specialization = specialization
    doctor.experience = experience

    db.commit()
    db.refresh(doctor)

    return doctor


# ✅ DELETE
@router.delete("/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    db.delete(doctor)
    db.commit()

    return {"message": "Doctor deleted"}


# 🔥 ACTIVATE
@router.patch("/{doctor_id}/activate", summary="Activate Doctor")
def activate_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    doctor.is_active = True

    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor activated",
        "doctor_id": doctor.id,
        "is_active": doctor.is_active
    }


# 🔥 DEACTIVATE
@router.patch("/{doctor_id}/deactivate", summary="Deactivate Doctor")
def deactivate_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    doctor.is_active = False

    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor deactivated",
        "doctor_id": doctor.id,
        "is_active": doctor.is_active
    }