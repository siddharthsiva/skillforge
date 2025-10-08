from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    username = Column(String, unique=True)
    xp = Column(Integer, default=0)
    skill_tree = Column(JSON)

class Quest(Base):
    __tablename__ = "quests"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    topic = Column(String)
    challenge = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
