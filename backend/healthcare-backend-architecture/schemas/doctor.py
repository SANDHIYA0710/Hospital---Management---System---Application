from pydantic import BaseModel

class DoctorCreate(BaseModel):
    name: str
    specialization: str
    experience: int   # ✅ THIS IS THE FIX
    email: str 