from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List

from pydantic.types import conint

class LdapUsers(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode: True

class TokenData(BaseModel):
    id: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    groups: List[str]

class PasswordCreate(BaseModel):
    password: str
    login_password: str
    description: Optional[str] = None
    about_password: Optional[str] = None

    class Config:
        orm_mode = True


class Password(BaseModel):
    id: int
    password: str
    login_password: str
    description: Optional[str] = None
    about_password: Optional[str] = None
    created_by: int


    class Config:
        orm_mode = True

class PasswordWithCreator(Password):
    created_by_name: str

# Схема для Group, которая будет использоваться для ответа
class Group(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    created_by: int
    visible: bool

    class Config:
        orm_mode = True  # Это позволит Pydantic работать с объектами SQLAlchemy

class LoginRequest(BaseModel):
    username: str
    password: str

class UserDetails(BaseModel):
    user_id: int
    name: str
    email: str
    issuperuser: bool
    created_at: str
    groups: List[Group]  # Список строк для групп
    passwords: List[Password]  # Список строк для паролей

    class Config:
        orm_mode = True

class GroupAll(BaseModel):
    groups: List[Group]