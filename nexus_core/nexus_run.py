from ingest_alpha_vantage import get_treasury_yield, get_stock_daily
from ingest_polymarket import get_active_markets, get_market_history
from nexus_analysis import analyze_correlation
from config import ALPHA_VANTAGE_API_KEY, MASTER_SYMBOL
import pandas as pd

def run_nexus_test():
    """
    Orchestrate a mini-run of the Nexus Engine.
    """
    print("=== Nexus Engine: Test Run ===")
    
    # 1. Fetch Finance Data
    print(f"Fetching {MASTER_SYMBOL} data...")
    df_finance = get_stock_daily(MASTER_SYMBOL, api_key=ALPHA_VANTAGE_API_KEY)
    
    if df_finance is None or df_finance.empty:
        print("Failed to fetch finance data. Using mock for analysis demonstration.")
        df_finance = pd.DataFrame({
            "date": pd.date_range("2026-03-01", periods=10),
            "value": [450, 452, 448, 455, 457, 460, 458, 462, 465, 463]
        })
    else:
        # Prep for analysis (rename '4. close' to 'value')
        df_finance = df_finance.rename(columns={"4. close": "value"}).reset_index().rename(columns={"index": "date"})
        df_finance["value"] = pd.to_numeric(df_finance["value"])

    # 2. Fetch Prediction Markets (Mocking a specific market for the demo)
    print("Fetching Polymarket data...")
    # In a real run, we'd select a specific ID. Using mock for consistent test.
    df_pred = pd.DataFrame({
        "date": pd.date_range("2026-03-01", periods=10),
        "value": [0.65, 0.67, 0.64, 0.70, 0.72, 0.75, 0.74, 0.78, 0.82, 0.80]
    })

    # 3. Analyze Correlation & Anomaly
    print("\nRunning Correlation Analysis...")
    corr, lag, series = analyze_correlation(df_finance, df_pred)
    
    print("\nCalculating Divergence (Anomaly) Score...")
    df_div = calculate_divergence_score(df_finance, df_pred)
    print(df_div.tail())

    print("\n=== Test Run Complete ===")
    print(f"Nexus Insight: The assets are {corr*100:.1f}% correlated with a {lag} day lead/lag.")

if __name__ == "__main__":
    run_nexus_test()
