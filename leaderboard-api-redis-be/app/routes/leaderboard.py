from fastapi import APIRouter
from app.redis_client import r
import json

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])

@router.get("/")
async def get_leaderboard(limit: int = 10):
    top = r.zrevrange("leaderboard", 0, limit - 1, withscores=True)
    return [{"username": u, "score": s} for u, s in top]
