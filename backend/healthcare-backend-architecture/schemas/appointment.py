from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    patient_name: str
    doctor_name: str
    date: str