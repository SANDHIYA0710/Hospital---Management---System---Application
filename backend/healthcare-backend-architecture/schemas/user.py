from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str