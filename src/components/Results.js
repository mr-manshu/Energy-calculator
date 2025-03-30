import React from "react";

const wattages = [75, 9, 5, 350, 150, 500, 200, 1000, 750, 120];
const ratePerUnit = 7; // ₹ per kWh

const Results = ({ data }) => {
  const getConsumption = (item, index) => {
    if (!item.use) return { daily: 0, weekly: 0, monthly: 0, cost: 0 };
    const daily = (wattages[index] * item.quantity * 1) / 1000;
    const weekly = daily * 7;
    const monthly = daily * item.days;
    const cost = monthly * ratePerUnit;
    return { daily, weekly, monthly, cost };
  };

  return (
    <div style={{ marginTop: "20px", color: "white" }}>
      <h2>📊 Detailed Consumption & Cost</h2>
      <table style={{ width: "100%", marginTop: "10px", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Component</th>
            <th>Daily (kWh)</th>
            <th>Weekly (kWh)</th>
            <th>Monthly (kWh)</th>
            <th>Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const result = getConsumption(item, index);
            return item.use ? (
              <tr key={index}>
                <td>{["Fan", "LED", "Charger", "Fridge", "Cooler", "Washing Machine", "Motor", "Iron", "Inverter", "AC"][index]}</td>
                <td>{result.daily.toFixed(2)}</td>
                <td>{result.weekly.toFixed(2)}</td>
                <td>{result.monthly.toFixed(2)}</td>
                <td>₹{result.cost.toFixed(2)}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Results;