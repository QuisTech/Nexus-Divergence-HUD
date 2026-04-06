# 🏛️ The Nexus Engine
**AI-Native Command Center for Cross-Domain Alpha Detection.**

> **Elevator Pitch**: An analytical command center correlating Polymarket sentiment with institutional financial data to identify high-alpha market anomalies in real-time.

---

## ⚡ The "Divergence Dilemma"
The Nexus Engine solves the time-sensitive gap between crowd-sourced intelligence (Prediction Markets) and institutional execution (Financial Markets). By calculating the **Lead/Lag Correlation** in real-time, the engine identifies the exact moment when the crowd sees something the institutions don't.

### Manual Analysis vs. Nexus Engine
| Feature | Manual Analysis | Nexus Engine |
| :--- | :--- | :--- |
| **Data Correlation** | 2-4 hours (Spreadsheets) | **< 3ms (Vector Alignment)** |
| **Divergence Logic** | Subjective / Guesswork | **AI-Native Lead/Lag Scoring** |
| **Response Time** | Reactive | **Predictive (Pulse HUD)** |
| **Audit Trail** | Fragmented browser tabs | **Stateful Backboard Ledger** |

---

## 🛠️ Tech Stack
*   **Frontend**: Next.js 15, Tailwind 4, Framer Motion 12, Recharts.
*   **Stateful Memory**: [Backboard.io](https://backboard.io) (Persistent AI context).
*   **Market Data**: Alpha Vantage (Institutional Finance), Polymarket (Sentiment).
*   **Orchestration**: Python 3.12 (Vector correlation pipeline).

---

## 🚀 Getting Started

### Prerequisites
*   Alpha Vantage API Key
*   Backboard.io API Key

### Installation
1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/QuisTech/Nexus-Divergence-HUD.git
    cd Nexus-Divergence-HUD
    ```
2.  **Set Environment Variables**:
    Create a `.env.local` file:
    ```env
    ALPHA_VANTAGE_API_KEY=your_key
    BACKBOARD_API_KEY=your_key
    ```
3.  **Install & Run**:
    ```bash
    npm install
    npm run dev
    ```

---

## 🧠 How it Works
1.  **Ingestion**: Real-time ticker data is pulled from Alpha Vantage.
2.  **Correlation**: Our Python-based "Divergence Engine" compares price movement against Polymarket sentiment deltas.
3.  **Memory**: Backboard.io stores the stateful history of these correlations, allowing the AI to "remember" lead/lag patterns for specific sectors.
4.  **HUD Visualization**: A high-density dashboard provides a futuristic "Command Center" view of market convergence.

---

## 🏆 Hackathon Submission
This project was built for **ZerveHack 2026**.
*   **Design Philosophy**: "Victory through Visual Authority."
*   **Core Achievement**: Solved Next.js 15 hydration and Tailwind v4 build constraints for a production-ready HUD.

---

*Built with ❤️ by QuisTech for the ZerveHack community.*
