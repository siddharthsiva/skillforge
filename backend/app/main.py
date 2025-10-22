from fastapi import FastAPI
from .routes import users, battle, quests 

app = FastAPI()
app.include_router(battle.router)
app.include_router(users.router)
app.include_router(quests.router)
