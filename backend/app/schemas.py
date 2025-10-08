from pydantic import BaseModel
from typing import Optional, Dict

class UserCreate(BaseModel):
    username: str

class UserOut(BaseModel):
    id: str
    username: str
    xp: int
    skill_tree: Dict

class QuestCreate(BaseModel):
    user_id: str
    topic: str

class QuestOut(BaseModel):
    id: str
    topic: str
    challenge: Dict
