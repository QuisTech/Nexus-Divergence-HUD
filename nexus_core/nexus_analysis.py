import pandas as pd
import numpy as np

try:
    import matplotlib.pyplot as plt
    import seaborn as sns
    HAS_VIZ = True
except ImportError:
    HAS_VIZ = False

def analyze_correlation(df_finance, df_prediction):
    """
    Perform correlation analysis between financial data and prediction market odds.
    """
    # 1. Alignment: Merge on daily index
    df = pd.merge(df_finance, df_prediction, on="date", how="inner", suffixes=("_fin", "_pred"))
    
    # 2. Correlation Calculation
    correlation = df["value_fin"].corr(df["value_pred"])
    print(f"Direct Pearson Correlation: {correlation:.4f}")
    
    # 3. Lead/Lag Analysis
    lags = range(-5, 6) # Look up to 5 days ahead/behind
    correlations = []
    for lag in lags:
        corr = df["value_fin"].corr(df["value_pred"].shift(lag))
        correlations.append(corr)
        
    optimal_lag = lags[np.argmax(np.abs(correlations))]
    print(f"Optimal Lag: {optimal_lag} days (Max Correlation: {max(np.abs(correlations)):.4f})")
    
    return correlation, optimal_lag, correlations

def calculate_divergence_score(df_finance, df_prediction, window=5):
    """
    Calculate a 'Divergence Score' when crowd sentiment (prediction) 
    does not align with financial reality (finance).
    """
    # Align
    df = pd.merge(df_finance, df_prediction, on="date", how="inner", suffixes=("_fin", "_pred"))
    
    # Normalize (0-1) for comparison
    df["fin_norm"] = (df["value_fin"] - df["value_fin"].min()) / (df["value_fin"].max() - df["value_fin"].min())
    df["pred_norm"] = (df["value_pred"] - df["value_pred"].min()) / (df["value_pred"].max() - df["value_pred"].min())
    
    # Divergence is the rolling absolute difference
    df["divergence"] = (df["fin_norm"] - df["pred_norm"]).abs()
    df["divergence_score"] = df["divergence"].rolling(window=window).mean()
    
    return df[["date", "divergence_score"]]

if __name__ == "__main__":
    # Mock data for demonstration within the workspace
    dates = pd.date_range("2026-01-01", periods=30)
    mock_finance = pd.DataFrame({"date": dates, "value": [4.5 + x*0.01 for x in range(30)]})
    mock_pred = pd.DataFrame({"date": dates, "value": [0.6 + x*0.01 + np.random.normal(0, 0.05) for x in range(30)]})
    
    analyze_correlation(mock_finance, mock_pred)
