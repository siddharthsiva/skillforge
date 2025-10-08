from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import SessionLocal
from ..crud import get_user, create_quest
from ..ai.quest_generator import generate_challenge
from ..schemas import QuestCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/quests")
async def generate_quest(data: QuestCreate, db: AsyncSession = Depends(get_db)):
    user = await get_user(db, data.user_id)
    challenge = await generate_challenge(data.topic, weakness="recursion", strength="functions")
    quest = await create_quest(db, data.user_id, data.topic, challenge)
    return quest
