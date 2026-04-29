from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.patient import Patient
from schemas.patient import PatientCreate as SchemaPatientCreate  # ✅ ADDED (rename to avoid conflict)

router = APIRouter(prefix="/patients", tags=["Patients"])

# ✅ YOUR EXISTING CLASS (kept as it is)
class PatientCreate(BaseModel):
    name: str
    age: int
    phone: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ YOUR ORIGINAL FUNCTION (UNCHANGED)
@router.post("/")
def create_patient(data: PatientCreate, db: Session = Depends(get_db)):
    patient = Patient(**data.dict())
    db.add(patient)
    db.commit()
    return {"message": "Patient Created"}


# ✅ 🔥 ADDED (SAFE JSON HANDLER – FIXES 422)
@router.post("/json")
def create_patient_json(data: PatientCreate, db: Session = Depends(get_db)):
    patient = Patient(
        name=data.name,
        age=data.age,
        phone=data.phone
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


@router.get("/")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@router.put("/{patient_id}")
def update_patient(patient_id: int, data: PatientCreate, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    patient.name = data.name
    patient.age = data.age
    patient.gender = data.gender
    db.commit()
    return {"message": "Patient Updated"}


@router.delete("/{patient_id}")
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    db.delete(patient)
    db.commit()
    return {"message": "Patient Deleted"}