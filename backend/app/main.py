from fastapi import FastAPI
from .routes import users, quests

app = FastAPI()

app.include_router(users.router)
app.include_router(quests.router)
