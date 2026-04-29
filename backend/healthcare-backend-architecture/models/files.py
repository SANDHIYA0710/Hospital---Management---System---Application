from sqlalchemy import Column, Integer, String
from database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer)
    filename = Column(String)