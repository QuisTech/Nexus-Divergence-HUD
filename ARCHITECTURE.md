# Nexus Engine Architecture: The 'Terroir' of Divergence

The Nexus Engine is an institutional-grade cross-domain correlation system designed to identify market inefficiencies ('Divergences') between prediction markets and financial benchmarks.

## 1. Data Ingestion Layer (The 'Must')
- **Finance Ingestion**: Leverages Alpha Vantage for real-time S&P 500 (SPY) daily adjusted time series.
- **Sentiment Ingestion**: Utilizes the Polymarket Gamma API to extract crowd-sourced probability 'Yes' prices across finance-adjacent markets.
- **Resilience Strategy**: Implements a multi-tier fallback system. If primary APIs are throttled or unreachable, the engine utilizes high-fidelity synthetic variance models seeded by historical trends to maintain HUD continuity.

## 2. Analytical Core (The 'Fermentation')
- **Pearson Correlation**: Computes the linear correlation coefficient between asset returns and volume-weighted sentiment shifts.
- **Lead/Lag Analysis**: The Python backend (`zerve_nexus_analysis.py`) performs cross-correlation to determine if sentiment shifts lead price action or vice versa.
- **Normalization**: All disparate data streams are normalized to a 0-1 range before correlation to ensure mathematical integrity.

## 3. Visualization Layer (The 'Bottle')
- **Next.js 15 + Tailwind 4**: Provides a zero-latency, glassmorphic HUD designed for institutional 'Visual Authority.'
- **Director Mode**: An orchestration engine that automates complex system walkthroughs. Refactored into a modular, decoupled architecture for long-term scalability.
- **Stateful Memory**: Integrated with Backboard.io for cross-session telemetry and stateful persistence of divergence alerts.

## 4. Security & Compliance
- **Credential Management**: No hardcoded secrets. All API keys are managed via environment variables and encrypted vault injections.
- **Testing Suite**: Automated validation of analytical models and UI responsiveness via a structured test harness.

---
*Nexus Engine v4.82 — Engineered for Victory.*
