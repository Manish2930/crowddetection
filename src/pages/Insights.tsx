import React, { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  ScatterChart, Scatter, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

type ZoneType = string;

const mockData = {
  abnormal: [
    { timestamp: "10:00", zone: "A", camera_id: "C1", abnormal_behavior: "Panic" },
    { timestamp: "10:05", zone: "A", camera_id: "C1", abnormal_behavior: "Fight" },
    { timestamp: "10:10", zone: "B", camera_id: "C2", abnormal_behavior: "Push" },
    { timestamp: "10:15", zone: "B", camera_id: "C2", abnormal_behavior: "Running" },
    { timestamp: "10:20", zone: "C", camera_id: "C3", abnormal_behavior: "Shouting" },
    { timestamp: "10:25", zone: "D", camera_id: "C4", abnormal_behavior: "Collapse" },
    { timestamp: "10:30", zone: "E", camera_id: "C5", abnormal_behavior: "Object Thrown" }
  ],
  risk: [
    { timestamp: "10:00", zone: "A", camera_id: "C1", risk_score: 5 },
    { timestamp: "10:05", zone: "A", camera_id: "C1", risk_score: 7 },
    { timestamp: "10:10", zone: "B", camera_id: "C2", risk_score: 3 },
    { timestamp: "10:15", zone: "B", camera_id: "C2", risk_score: 6 },
    { timestamp: "10:20", zone: "C", camera_id: "C3", risk_score: 8 },
    { timestamp: "10:25", zone: "D", camera_id: "C4", risk_score: 9 },
    { timestamp: "10:30", zone: "E", camera_id: "C5", risk_score: 4 }
  ],
  highRisk: [
    { timestamp: "10:00", zone: "A", camera_id: "C1", high_risk_zone: 1 },
    { timestamp: "10:05", zone: "B", camera_id: "C2", high_risk_zone: 0 },
    { timestamp: "10:10", zone: "B", camera_id: "C2", high_risk_zone: 1 },
    { timestamp: "10:15", zone: "C", camera_id: "C3", high_risk_zone: 1 },
    { timestamp: "10:20", zone: "D", camera_id: "C4", high_risk_zone: 0 },
    { timestamp: "10:25", zone: "E", camera_id: "C5", high_risk_zone: 1 },
    { timestamp: "10:30", zone: "E", camera_id: "C5", high_risk_zone: 1 }
  ],
  alert: [
    { timestamp: "10:00", zone: "A", camera_id: "C1", alert_triggered: 1 },
    { timestamp: "10:05", zone: "B", camera_id: "C2", alert_triggered: 0 },
    { timestamp: "10:10", zone: "C", camera_id: "C3", alert_triggered: 1 },
    { timestamp: "10:15", zone: "D", camera_id: "C4", alert_triggered: 1 },
    { timestamp: "10:20", zone: "E", camera_id: "C5", alert_triggered: 0 },
    { timestamp: "10:25", zone: "A", camera_id: "C1", alert_triggered: 1 },
    { timestamp: "10:30", zone: "D", camera_id: "C4", alert_triggered: 1 }
  ],
  flow: [
    { timestamp: "10:00", zone: "A", camera_id: "C1", density: 20 },
    { timestamp: "10:05", zone: "B", camera_id: "C2", density: 35 },
    { timestamp: "10:10", zone: "C", camera_id: "C3", density: 50 },
    { timestamp: "10:15", zone: "D", camera_id: "C4", density: 60 },
    { timestamp: "10:20", zone: "E", camera_id: "C5", density: 70 },
    { timestamp: "10:25", zone: "A", camera_id: "C1", density: 90 },
    { timestamp: "10:30", zone: "C", camera_id: "C3", density: 100 }
  ],
  density: [
    { timestamp: "10:00", zone: "A", camera_id: "C1", density: 25 },
    { timestamp: "10:05", zone: "B", camera_id: "C2", density: 45 },
    { timestamp: "10:10", zone: "C", camera_id: "C3", density: 65 },
    { timestamp: "10:15", zone: "D", camera_id: "C4", density: 75 },
    { timestamp: "10:20", zone: "E", camera_id: "C5", density: 85 },
    { timestamp: "10:25", zone: "A", camera_id: "C1", density: 95 },
    { timestamp: "10:30", zone: "E", camera_id: "C5", density: 100 }
  ]
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const Insights = () => {
  const [zoneFilter, setZoneFilter] = useState<ZoneType>("All");

  const filterData = <T extends { zone: string }>(dataset: T[]): T[] =>
    zoneFilter === "All" ? dataset : dataset.filter((item) => item.zone === zoneFilter);

  const abnormalCounts = () => {
    const counts: { timestamp: string; count: number }[] = [];
    const map = new Map<string, number>();
    filterData(mockData.abnormal).forEach(({ timestamp }) => {
      map.set(timestamp, (map.get(timestamp) || 0) + 1);
    });
    map.forEach((count, timestamp) => counts.push({ timestamp, count }));
    return counts;
  };

  return (
    <div className="p-6 space-y-10 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-gray-800">Crowd Monitoring Insights</h1>
  
    {/* Zone Filter */}
    <div className="flex items-center gap-3">
      <label className="text-lg font-medium text-gray-700">Filter by Zone:</label>
      <select
        value={zoneFilter}
        onChange={(e) => setZoneFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="All">All</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
      </select>
    </div>
  
    {/* Each chart/table section follows this layout */}
    <section className="bg-gray-50 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Abnormal Behavior Count</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={abnormalCounts()}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  
    {/* Repeat for other sections with same wrapper styles */}
    <section className="bg-gray-50 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Risk Score Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filterData(mockData.risk)}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="risk_score" stroke="#facc15" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  
    <section className="bg-gray-50 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">High Risk Zone Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={[
              { name: "High Risk", value: filterData(mockData.highRisk).filter((d) => d.high_risk_zone).length },
              { name: "Normal", value: filterData(mockData.highRisk).filter((d) => !d.high_risk_zone).length },
            ]}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </section>
  
    <section className="bg-gray-50 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Alerts Triggered</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Zone</th>
              <th className="border px-4 py-2">Camera ID</th>
              <th className="border px-4 py-2">Alert Triggered</th>
            </tr>
          </thead>
          <tbody>
            {filterData(mockData.alert).map((alert, index) => (
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="border px-4 py-2">{alert.timestamp}</td>
                <td className="border px-4 py-2">{alert.zone}</td>
                <td className="border px-4 py-2">{alert.camera_id}</td>
                <td className="border px-4 py-2">{alert.alert_triggered ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  
    <section className="bg-gray-50 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Crowd Flow Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filterData(mockData.flow)}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="density" stroke="#10b981" fill="#6ee7b7" />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  
    <section className="bg-gray-50 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Density Scatter Plot</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="density" />
          <Tooltip />
          <Legend />
          <Scatter name="Density" data={filterData(mockData.density)} fill="#a78bfa" />
        </ScatterChart>
      </ResponsiveContainer>
    </section>
  </div>
  
  );
};

export default Insights;