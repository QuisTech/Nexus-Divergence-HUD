import { NextResponse } from 'next/server';

// Analytical Engine Port (JS version)
export async function GET() {
  // Mocking the Nexus Engine data for the local preview
  // In a real Vercel deploy, this would fetch from Alpha Vantage/Polymarket
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const financeData = dates.map((date, i) => ({
    date,
    value: 450 + i * 2 + Math.random() * 5
  }));

  const predictionData = dates.map((date, i) => ({
    date,
    value: 0.6 + i * 0.01 + Math.random() * 0.05
  }));

  // Correlation logic
  const valuesFin = financeData.map(d => d.value);
  const valuesPred = predictionData.map(d => d.value);
  
  // Simple Pearson Correlation
  const meanFin = valuesFin.reduce((a, b) => a + b, 0) / valuesFin.length;
  const meanPred = valuesPred.reduce((a, b) => a + b, 0) / valuesPred.length;
  
  let num = 0;
  let denFin = 0;
  let denPred = 0;
  for (let i = 0; i < valuesFin.length; i++) {
    num += (valuesFin[i] - meanFin) * (valuesPred[i] - meanPred);
    denFin += Math.pow(valuesFin[i] - meanFin, 2);
    denPred += Math.pow(valuesPred[i] - meanPred, 2);
  }
  const correlation = num / Math.sqrt(denFin * denPred);

  // Divergence Score (Anomaly)
  const divergence = financeData.map((d, i) => {
    const finNorm = (d.value - 450) / 60;
    const predNorm = (predictionData[i].value - 0.6) / 0.3;
    return {
      date: d.date,
      score: Math.abs(finNorm - predNorm) * 100
    };
  });

  return NextResponse.json({
    correlation: correlation.toFixed(4),
    lag: "2 days (CROWD LEADS)",
    financeData,
    predictionData,
    divergence,
    insight: "High anomaly detected: Prediction market is shifting ahead of index pricing."
  });
}
