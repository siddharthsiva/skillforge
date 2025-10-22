from fastapi import APIRouter
from models import BattleSession
from utils.langchain import generate_quiz

router = APIRouter()

@router.post("/battle/start")
def start_battle(user_id: str, topic: str):
    # For now, simulate opponent matching
    opponent_id = "opponent-123"

    # Generate shared quiz
    quiz = generate_quiz(topic)

    # Create battle session
    session = BattleSession.create(user_id, opponent_id, quiz)

    return {
        "session_id": session.id,
        "quiz": quiz,
        "players": [user_id, opponent_id]
    }
