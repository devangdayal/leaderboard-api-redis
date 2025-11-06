import json
from redis_client import r


CHANNEL = "leaderboard_updates"


def leaderboard_listener():
    pubsub = r.pubsub()
    pubsub.subscribe(CHANNEL)
    print("Listening for leaderboard updates...")

    for message in pubsub.listen():
        if message['type'] == 'message':
            data = json.loads(message['data'])
            username = data['username']
            score = data['score']
            print(f"New score submitted - User: {username}, Score: {score}")
            
            
            
            
if __name__ == "__main__":
    leaderboard_listener()