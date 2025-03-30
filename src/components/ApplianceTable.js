import React from "react";

const ApplianceTable = ({ data, setData }) => {
  const appliances = [
    { name: "Fan", watt: 75 },
    { name: "Bulb", watt: 9 },
    { name: "Phone Charger", watt: 5 },
    { name: "Inverter", watt: 350 },
    { name: "Fridge", watt: 150 },
    { name: "Washing Machine", watt: 500 },
    { name: "Cooler", watt: 200 },
    { name: "Iron", watt: 1000 },
    { name: "Water Motor", watt: 750 },
    { name: "TV", watt: 120 },
  ];

  const handleChange = (index, key, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [key]: value };
    setData(newData);
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Use</th>
          <th>Component</th>
          <th>No. of Components</th>
          <th>Energy (Watt)</th>
          <th>No. of Days</th>
          <th>No. of Hours</th>
        </tr>
      </thead>
      <tbody>
        {appliances.map((appliance, index) => (
          <tr key={index} style={{ borderBottom: "1px solid #444", height: "50px", background: index % 2 === 0 ? "#1a1a1a" : "#222", transition: "0.3s" }}>
            <td>
              <input
                type="checkbox"
                checked={data[index].use}
                onChange={(e) => handleChange(index, "use", e.target.checked)}
              />
            </td>
            <td>{appliance.name}</td>
            <td>
              <input
                type="number"
                value={data[index].quantity}
                min="0"
                onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
                style={{ width: "50px" }}
              />
            </td>
            <td>
              <input
                type="number"
                value={data[index].watt || appliance.watt}
                onChange={(e) => handleChange(index, "watt", Number(e.target.value))}
                style={{ width: "70px" }}
              />
            </td>
            <td>
              <input
                type="number"
                value={data[index].days}
                min="1"
                onChange={(e) => handleChange(index, "days", Number(e.target.value))}
                style={{ width: "50px" }}
              />
            </td>
            <td>
              <input
                type="number"
                value={data[index].hours || 0}
                min="0"
                max="24"
                onChange={(e) => handleChange(index, "hours", Number(e.target.value))}
                style={{ width: "50px" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplianceTable;
