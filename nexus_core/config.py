# Nexus Engine Configuration
import os

# API Keys (Recommend setting these as environment variables in Zerve)
ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
BACKBOARD_API_KEY = os.getenv("BACKBOARD_API_KEY")

# Project Settings
MASTER_SYMBOL = "SPY"
MASTER_TREASURY = "10year"
POLYMARKET_TAG_ID = "10" # Example tag for Economics (needs verification)
