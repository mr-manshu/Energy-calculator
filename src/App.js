import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./index.css";

const App = () => {
  const [costPerUnit, setCostPerUnit] = useState(7);
  const [appliances, setAppliances] = useState([
    { name: "Bulb", quantity: 1, wattage: 12, hours: 5, selected: false },
    { name: "Tubelight", quantity: 1, wattage: 18, hours: 6, selected: false },
    { name: "Table Lamp", quantity: 1, wattage: 10, hours: 4, selected: false },
    { name: "Cooler", quantity: 1, wattage: 200, hours: 8, selected: false },
    { name: "AC", quantity: 1, wattage: 1500, hours: 6, selected: false },
    { name: "Ceiling Fan", quantity: 1, wattage: 75, hours: 8, selected: false },
    { name: "Personal Fan", quantity: 1, wattage: 50, hours: 8, selected: false },
    { name: "Mixer", quantity: 1, wattage: 500, hours: 1, selected: false },
    { name: "Water Pump", quantity: 1, wattage: 750, hours: 2, selected: false },
    { name: "Fridge", quantity: 1, wattage: 150, hours: 24, selected: false },
    { name: "Washing Machine", quantity: 1, wattage: 500, hours: 2, selected: false },
    { name: "Iron", quantity: 1, wattage: 1000, hours: 1, selected: false },
    { name: "TV", quantity: 1, wattage: 120, hours: 4, selected: false },
    { name: "Charger", quantity: 1, wattage: 5, hours: 3, selected: false },
    { name: "Microwave", quantity: 1, wattage: 1200, hours: 1, selected: false },
    { name: "Blow Dryer", quantity: 1, wattage: 1500, hours: 0.5, selected: false }
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedAppliances = [...appliances];
    updatedAppliances[index][field] = value;
    setAppliances(updatedAppliances);
  };

  const toggleSelection = (index) => {
    const updatedAppliances = [...appliances];
    updatedAppliances[index].selected = !updatedAppliances[index].selected;
    setAppliances(updatedAppliances);
  };

  const calculateConsumption = (appliance) => {
    const daily = (appliance.quantity * appliance.wattage * appliance.hours) / 1000;
    const monthly = daily * 30;
    return { daily, monthly, cost: monthly * costPerUnit };
  };

  const totalMonthlyUnits = appliances.filter(a => a.selected).reduce((sum, a) => sum + calculateConsumption(a).monthly, 0);
  const totalCost = totalMonthlyUnits * costPerUnit;

  const pieData = appliances.filter(a => a.selected).map(a => ({
    name: a.name,
    value: calculateConsumption(a).monthly,
  }));

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d84a48", "#6a4ad8", "#4ad89d", "#c658ff"];

  return (
    <div className="container">
      <h1>⚡ Energy Consumption Calculator</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Use</th>
              <th>Component</th>
              <th>Quantity</th>
              <th>Wattage</th>
              <th>Hours/Day</th>
            </tr>
          </thead>
          <tbody>
            {appliances.map((appliance, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={appliance.selected}
                    onChange={() => toggleSelection(index)}
                  />
                </td>
                <td>{appliance.name}</td>
                <td>
                  <input
                    type="number"
                    value={appliance.quantity}
                    onChange={(e) => handleInputChange(index, "quantity", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={appliance.wattage}
                    onChange={(e) => handleInputChange(index, "wattage", Number(e.target.value))}
                  />W
                </td>
                <td>
                  <input
                    type="number"
                    value={appliance.hours}
                    onChange={(e) => handleInputChange(index, "hours", Number(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-results-container">
        <div className="summary-card">
          <h2>Total Monthly Consumption</h2>
          <p>📊 Total Monthly Units: {totalMonthlyUnits.toFixed(2)} kWh</p>
          <p>💰 Total Estimated Cost: ₹{totalCost.toFixed(2)}</p>
          <p className="note">* This bill is calculated at ₹7 per unit.</p>
        </div>
        <div className="chart-card">
          <h2>Consumption Breakdown</h2>
          <PieChart width={400} height={400}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="quote-card">
          <h2>"Save electricity not just for the money, but for our Earth which is suffering from global warming."</h2>
        </div>
      </div>

      <div className="results-card">
        <h2>Results</h2>
        {appliances.filter(a => a.selected).map((appliance, index) => {
          const { daily, monthly, cost } = calculateConsumption(appliance);
          return (
            <div key={index}>
              <h3>{appliance.name}</h3>
              <p>🔹 Daily: {daily.toFixed(2)} kWh</p>
              <p>🔹 Monthly: {monthly.toFixed(2)} kWh</p>
              <p>💰 Cost: ₹{cost.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;