import backboard
import os

BACKBOARD_API_KEY = os.getenv("BACKBOARD_API_KEY")
BASE_URL = "https://app.backboard.io/api/v1"

def store_market_context(event_title, context_summary):
    """
    Store market context in Backboard.io for AI retrieval.
    """
    url = f"{BASE_URL}/memory/create"
    headers = {
        "Authorization": f"Bearer {BACKBOARD_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "title": event_title,
        "content": context_summary,
        "metadata": {"type": "market_context", "project": "NexusEngine"}
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        print(f"Stored context for: {event_title}")
        return True
    except Exception as e:
        print(f"Error connecting to Backboard: {e}")
        return False

if __name__ == "__main__":
    event = "Fed Interest Rate Decision (May 2026)"
    summary = "The Fed is expected to hold rates but signaling more hawkishness due to sticky service inflation."
    
    if store_market_context(event, summary):
        print("Market Context successfully stored in Backboard.")
