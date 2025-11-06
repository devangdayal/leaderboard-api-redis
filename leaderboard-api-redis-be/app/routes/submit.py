import json
from fastapi import APIRouter
from app.utils.ws_manager import manager
from app.redis_client import r  # assuming your redis client is here

router = APIRouter()

@router.post("/submit/")
async def submit_score(username: str, score: float):
    # Store the score in Redis sorted set
    r.zadd("leaderboard", {username: score})
    
    # Get top 10 scores
    leaderboard = r.zrevrange("leaderboard", 0, 9, withscores=True)

    # Convert leaderboard bytes to strings if needed
    result = [
        {"username": u.decode() if isinstance(u, bytes) else u, "score": s}
        for u, s in leaderboard
    ]

    # Broadcast leaderboard to all connected WebSocket clients
    await manager.broadcast(json.dumps(result))

    return {"message": f"Score of {score} submitted for user {username}."}
