import requests
import pandas as pd
import os

ALPHA_VANTAGE_API_URL = "https://www.alphavantage.co/query"

def get_treasury_yield(maturity="10year", interval="daily", api_key=None):
    """
    Fetch US Treasury Yield data from Alpha Vantage.
    """
    params = {
        "function": "TREASURY_YIELD",
        "interval": interval,
        "maturity": maturity,
        "apikey": api_key
    }
    response = requests.get(ALPHA_VANTAGE_API_URL, params=params)
    response.raise_for_status()
    data = response.json()
    
    if "data" in data:
        df = pd.DataFrame(data["data"])
        df["value"] = pd.to_numeric(df["value"], errors="coerce")
        df["date"] = pd.to_datetime(df["date"])
        return df
    else:
        print("Error fetching Treasury Yield:", data.get("Note", "Unknown error"))
        return None

def get_stock_daily(symbol, api_key=None):
    """
    Fetch daily adjusted stock prices (e.g., SPY, BTC).
    """
    params = {
        "function": "TIME_SERIES_DAILY_ADJUSTED",
        "symbol": symbol,
        "apikey": api_key
    }
    response = requests.get(ALPHA_VANTAGE_API_URL, params=params)
    response.raise_for_status()
    data = response.json()
    
    # Process only the Time Series (Daily) part
    time_series_key = "Time Series (Daily)"
    if time_series_key in data:
        df = pd.DataFrame.from_dict(data[time_series_key], orient="index")
        df.index = pd.to_datetime(df.index)
        return df.sort_index()
    else:
        print(f"Error fetching stock data for {symbol}:", data.get("Note", "Rate limit exceeded or invalid key"))
        return None

if __name__ == "__main__":
    from config import ALPHA_VANTAGE_API_KEY as API_KEY
    
    print("Fetching 10-year Treasury Yield data...")
    yield_data = get_treasury_yield(api_key=API_KEY)
    if yield_data is not None:
        print(yield_data.head())
    
    print("\nFetching SPY daily price...")
    spy_data = get_stock_daily("SPY", api_key=API_KEY)
    if spy_data is not None:
        print(spy_data.head())
