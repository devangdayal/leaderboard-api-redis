from fastapi import FastAPI
from app.routes import leaderboard, submit, ws_leaderboard

app = FastAPI(title="Leaderboard API")

app.include_router(leaderboard.router)
app.include_router(submit.router)
app.include_router(ws_leaderboard.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Leaderboard API"}    
