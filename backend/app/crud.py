from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .models import User, Quest
import uuid

async def get_user(session: AsyncSession, user_id: str):
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def create_user(session: AsyncSession, username: str):
    user = User(id=str(uuid.uuid4()), username=username, xp=0, skill_tree={})
    session.add(user)
    await session.commit()
    return user

async def create_quest(session: AsyncSession, user_id: str, topic: str, challenge: dict):
    quest = Quest(id=str(uuid.uuid4()), user_id=user_id, topic=topic, challenge=challenge)
    session.add(quest)
    await session.commit()
    return quest
