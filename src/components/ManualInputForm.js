import React, { useState } from "react";

const defaultAppliances = [
  { name: "Fan", wattage: 75, quantity: 1, hours: 5 },
  { name: "Bulb", wattage: 9, quantity: 2, hours: 6 },
  { name: "Phone Charger", wattage: 10, quantity: 1, hours: 2 },
  { name: "Fridge", wattage: 150, quantity: 1, hours: 24 },
  { name: "Washing Machine", wattage: 500, quantity: 1, hours: 1 },
  { name: "Cooler", wattage: 200, quantity: 1, hours: 8 },
  { name: "Iron", wattage: 1000, quantity: 1, hours: 0.5 },
  { name: "Inverter", wattage: 350, quantity: 1, hours: 3 },
  { name: "Water Pump", wattage: 750, quantity: 1, hours: 0.5 },
  { name: "TV", wattage: 120, quantity: 1, hours: 3 },
];

const ManualInputForm = ({ onDataChange }) => {
  const [appliances, setAppliances] = useState(defaultAppliances);

  const handleChange = (index, field, value) => {
    const updated = [...appliances];
    updated[index][field] = Number(value);
    setAppliances(updated);
    onDataChange(updated);
  };

  return (
    <div className="input-form">
      <h2>Enter Appliance Details</h2>
      {appliances.map((appliance, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <strong>{appliance.name}</strong>
          <input
            type="number"
            value={appliance.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
            placeholder="Quantity"
            style={{ marginLeft: "10px", width: "60px" }}
          />
          <input
            type="number"
            value={appliance.wattage}
            onChange={(e) => handleChange(index, "wattage", e.target.value)}
            placeholder="Watt"
            style={{ marginLeft: "10px", width: "80px" }}
          />
          <input
            type="number"
            value={appliance.hours}
            onChange={(e) => handleChange(index, "hours", e.target.value)}
            placeholder="Hours/Day"
            style={{ marginLeft: "10px", width: "80px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ManualInputForm;