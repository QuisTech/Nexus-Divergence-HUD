import requests
import pandas as pd
import json

GAMMA_API = "https://gamma-api.polymarket.com"
CLOB_API = "https://clob.polymarket.com"

def get_active_markets(tag_id=None):
    """
    Fetch active markets from Polymarket.
    If tag_id is provided, filters by that tag (e.g., Economics/Finance).
    """
    url = f"{GAMMA_API}/events"
    params = {
        "active": "true",
        "closed": "false",
        "limit": 100
    }
    if tag_id:
        params["tag_id"] = tag_id
        
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_market_history(market_id, interval="1h"):
    """
    Fetch historical price data for a specific market.
    """
    url = f"{CLOB_API}/prices-history"
    params = {
        "market": market_id,
        "interval": interval
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    # Example: Finding 'Fed' related markets
    print("Searching for Fed-related markets...")
    markets = get_active_markets()
    fed_markets = [m for m in markets if "Fed" in m.get("title", "")]
    
    if fed_markets:
        target = fed_markets[0]
        print(f"Found: {target['title']} (ID: {target['id']})")
        # Note: Polymarket IDs can be complex; ensure we use the correct one for CLOB
        # This is a baseline script to be refined in Zerve.
    else:
        print("No active Fed markets found in current top 100 events.")
