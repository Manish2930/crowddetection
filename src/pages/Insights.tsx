// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart,
//   Scatter, ResponsiveContainer
// } from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

// const endpoints = {
//   abnormal: "https://y350udnvm2.execute-api.us-east-1.amazonaws.com/ee",
//   risk: "https://0xbr7m1pnc.execute-api.us-east-1.amazonaws.com/ddd",
//   highRisk: "https://x8nfg7u8fg.execute-api.us-east-1.amazonaws.com/cccc",
//   alert: "https://ae9jc1a23a.execute-api.us-east-1.amazonaws.com/444ee",
// };

// interface ParsedCSV {
//   [key: string]: string | undefined;
// }

// const parseCSV = (csv: string): ParsedCSV[] => {
//   const lines = csv.trim().split("\n");
//   const headers = lines[0].split(",");
//   return lines.slice(1).map(line => {
//     const values = line.split(",");
//     const obj: ParsedCSV = {};
//     headers.forEach((header, index) => {
//       obj[header.trim()] = values[index]?.trim();
//     });
//     return obj;
//   });
// };

// const Insights = () => {
//   interface AbnormalBehavior {
//     abnormal_behavior: string;
//   }

//   const [abnormalData, setAbnormalData] = useState<AbnormalBehavior[]>([]);

//   interface RiskData {
//     timestamp: string;
//     risk_score: number;
//   }

//   const [riskData, setRiskData] = useState<RiskData[]>([]);

//   interface HighRiskZone {
//     zone: string;
//     high_risk_zone: number;
//   }

//   const [highRiskData, setHighRiskData] = useState<HighRiskZone[]>([]);

//   interface AlertData {
//     timestamp: string;
//     alert_triggered: number;
//   }

//   const [alertData, setAlertData] = useState<AlertData[]>([]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [riskRes, abnormalRes, highRiskRes, alertRes] = await Promise.all([
//           axios.get(endpoints.risk, { responseType: "text" }),
//           axios.get(endpoints.abnormal, { responseType: "text" }),
//           axios.get(endpoints.highRisk, { responseType: "text" }),
//           axios.get(endpoints.alert, { responseType: "text" }),
//         ]);

//         setRiskData(parseCSV(riskRes.data).map(item => ({
//           timestamp: item.timestamp || "",
//           risk_score: parseFloat(item.risk_score || "0"),
//         })));

//         setAbnormalData(parseCSV(abnormalRes.data).map(item => ({
//           abnormal_behavior: item.abnormal_behavior || "",
//         })));

//         setHighRiskData(parseCSV(highRiskRes.data).map(item => ({
//           zone: item.zone || "",
//           high_risk_zone: item.high_risk_zone?.toLowerCase() === "yes" ? 1 : 0,
//         })));

//         setAlertData(parseCSV(alertRes.data).map(item => ({
//           timestamp: item.timestamp || "",
//           alert_triggered: item.alert_triggered?.toLowerCase() === "yes" ? 1 : 0,
//         })));
//       } catch (error) {
//         console.error("Error loading CSV data:", error);
//       }
//     };

//     loadData();
//   }, []);

//   return (
//     <div className="p-6 space-y-12">
//       <h1 className="text-3xl font-bold text-center">Crowd Insights Dashboard</h1>

//       {/* Risk Score Line Chart */}
//       <div className="w-full h-96">
//         <h2 className="text-xl font-semibold mb-2">Risk Score Over Time</h2>
//         <ResponsiveContainer>
//           <LineChart data={riskData}>
//             <CartesianGrid stroke="#ccc" />
//             <XAxis dataKey="timestamp" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="risk_score" stroke="#ff7300" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Abnormal Behavior Pie Chart */}
//       <div className="w-full h-96">
//         <h2 className="text-xl font-semibold mb-2">Abnormal Behaviors Distribution</h2>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={Object.values(
//                 abnormalData.reduce((acc: Record<string, { name: string; value: number }>, cur: AbnormalBehavior) => {
//                   const type = cur.abnormal_behavior;
//                   acc[type] = acc[type] || { name: type, value: 0 };
//                   acc[type].value += 1;
//                   return acc;
//                 }, {})
//               )}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={120}
//               label
//             >
//               {abnormalData.map((_, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* High Risk Zones Bar Chart */}
//       <div className="w-full h-96">
//         <h2 className="text-xl font-semibold mb-2">High Risk Zones</h2>
//         <ResponsiveContainer>
//           <BarChart data={highRiskData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="zone" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="high_risk_zone" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Alerts Scatter Chart */}
//       <div className="w-full h-96">
//         <h2 className="text-xl font-semibold mb-2">Alerts Triggered</h2>
//         <ResponsiveContainer>
//           <ScatterChart>
//             <CartesianGrid />
//             <XAxis type="category" dataKey="timestamp" />
//             <YAxis type="number" dataKey="alert_triggered" />
//             <Tooltip />
//             <Scatter name="Alerts" data={alertData} fill="#ff0000" />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Insights;
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart,
  Scatter, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

const cameraIds = ["North_Cam1", "North_Cam2", "North_Cam3", "North_Cam4", "North_Cam5", "South_Cam1", "South_Cam2"];

const getRandomDensityData = () => {
  return cameraIds.map(id => ({
    timestamp: new Date().toISOString(),
    zone: id.includes("North") ? "North" : "South",
    camera_id: id,
    density: +(Math.random() * 5).toFixed(2)
  }));
};

const getRandomRiskData = () => ({
  timestamp: new Date().toLocaleTimeString(),
  risk_score: +(Math.random() * 10).toFixed(2)
});

const getRandomAbnormalData = () => {
  const types = ["Running", "Falling", "Pushing", "Shouting"];
  return Array.from({ length: 10 }, () => ({
    abnormal_behavior: types[Math.floor(Math.random() * types.length)],
  }));
};

const getRandomHighRiskData = () => {
  const zones = ["Gate A", "Gate B", "South Exit", "North Exit"];
  return zones.map(zone => ({
    zone,
    high_risk_zone: Math.random() > 0.5 ? 1 : 0
  }));
};

const getRandomAlertData = () => ({
  timestamp: new Date().toLocaleTimeString(),
  alert_triggered: Math.random() > 0.7 ? 1 : 0
});

const Insights = () => {
  interface RiskData {
    timestamp: string;
    risk_score: number;
  }

  const [riskData, setRiskData] = useState<RiskData[]>([]);
  interface AbnormalBehavior {
    abnormal_behavior: string;
  }
  const [abnormalData, setAbnormalData] = useState<AbnormalBehavior[]>([]);
  interface HighRiskZone {
    zone: string;
    high_risk_zone: number;
  }
  const [highRiskData, setHighRiskData] = useState<HighRiskZone[]>([]);
  interface AlertData {
    timestamp: string;
    alert_triggered: number;
  }
  const [alertData, setAlertData] = useState<AlertData[]>([]);
  interface DensityData {
    timestamp: string;
    zone: string;
    camera_id: string;
    density: number;
  }
  const [densityData, setDensityData] = useState<DensityData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskData(prev => [...prev.slice(-9), getRandomRiskData()]);
      setAbnormalData(getRandomAbnormalData());
      setHighRiskData(getRandomHighRiskData());
      setAlertData(prev => [...prev.slice(-20), getRandomAlertData()]);
      setDensityData(getRandomDensityData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center">Crowd Insights Dashboard</h1>

      {/* Risk Score Line Chart */}
      <div className="w-full h-96">
        <h2 className="text-xl font-semibold mb-2">Risk Score Over Time</h2>
        <ResponsiveContainer>
          <LineChart data={riskData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="risk_score" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Abnormal Behavior Pie Chart */}
      <div className="w-full h-96">
        <h2 className="text-xl font-semibold mb-2">Abnormal Behaviors Distribution</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={Object.values(
                abnormalData.reduce((acc: Record<string, { name: string; value: number }>, cur) => {
                  const type = cur.abnormal_behavior;
                  acc[type] = acc[type] || { name: type, value: 0 };
                  acc[type].value += 1;
                  return acc;
                }, {})
              )}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {abnormalData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* High Risk Zones Bar Chart */}
      <div className="w-full h-96">
        <h2 className="text-xl font-semibold mb-2">High Risk Zones</h2>
        <ResponsiveContainer>
          <BarChart data={highRiskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="zone" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="high_risk_zone" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts Scatter Chart */}
      <div className="w-full h-96">
        <h2 className="text-xl font-semibold mb-2">Alerts Triggered</h2>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="category" dataKey="timestamp" />
            <YAxis type="number" dataKey="alert_triggered" />
            <Tooltip />
            <Scatter name="Alerts" data={alertData} fill="#ff0000" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Camera Density Bar Chart */}
      <div className="w-full h-96">
        <h2 className="text-xl font-semibold mb-2">Crowd Density by Camera</h2>
        <ResponsiveContainer>
          <BarChart data={densityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="camera_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="density" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Insights;
