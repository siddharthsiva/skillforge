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

class BattleSession:
    @staticmethod
    def create(user1, user2, quiz):
        # Store in DB or memory (simplified)
        return {
            "id": "session-xyz",
            "quiz": quiz,
            "players": [user1, user2]
        }

    @staticmethod
    def get(session_id):
        # Retrieve session
        pass

