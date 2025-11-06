import json
from redis_client import r
import asyncio
from routes.ws_leaderboard import manager


CHANNEL = "leaderboard_updates"
CACHE_KEY = "leaderboard_cache"

def update_cache(message):
    
    leaderboard = r.zrevrange("leaderboard", 0, 9, withscores=True)
    result = [{"username": user, "score": score} for user, score in leaderboard]
    
    r.set(CACHE_KEY, json.dumps(result))
    print("Leaderboard cache updated.", result)
    # Broadcast to WebSocket clients
    asyncio.create_task(manager.broadcast(result))

def cache_listener():
    pubsub = r.pubsub()
    pubsub.subscribe(CHANNEL)
    print("Listening for leaderboard updates to update cache...")

    for message in pubsub.listen():
        if message["type"] == "message":
            data = json.loads(message["data"])
            print(f"New score submitted: {data['username']} → {data['score']}")
            update_cache(data)

if __name__ == "__main__":
    cache_listener()
