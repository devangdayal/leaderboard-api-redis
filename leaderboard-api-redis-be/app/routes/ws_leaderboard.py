# app/routes/ws_leaderboard.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.utils.ws_manager import manager

router = APIRouter(prefix="/ws", tags=["websocket"])

@router.websocket("/leaderboard")
async def leaderboard_ws(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keep connection open
    except WebSocketDisconnect:
        manager.disconnect(websocket)
