from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import SessionLocal
from ..crud import create_user
from ..schemas import UserCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users")
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    new_user = await create_user(db, user.username)
    return new_user
