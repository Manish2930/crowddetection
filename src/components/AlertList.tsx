import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export interface Alert {
  id: string;
  timestamp: Date;
  severity: string;
  type: string;
  location: string;
  description: string;
  status: string;
}

export function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://wfcga1r8z9.execute-api.us-east-1.amazonaws.com/dd')
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Raw API Response:", data);

        const body = JSON.parse(data.body);
        console.log("Parsed body:", body);

        const parsed = body.items.map((item: { id?: string; timestamp?: string; severity?: string; type?: string; location?: string; description?: string; status?: string; metadata?: { description?: string; timestamp?: string; severity?: string; type?: string; relatedCameraId?: string } }, index: number) => {
          console.log(`Item ${index}:`, item);

          // Safely extract description
          const description =
            item?.description?.trim() ||
            item?.metadata?.description?.trim() ||
            'No description available';

          return {
            id: item.id ?? `alert-${index}`,
            timestamp: new Date(item.timestamp ?? item.metadata?.timestamp ?? Date.now()),
            severity: item.severity ?? item.metadata?.severity ?? 'low',
            type: item.type ?? item.metadata?.type ?? 'unknown',
            location: item.location ?? item.metadata?.relatedCameraId ?? 'Unknown Location',
            description: description,
            status: item?.status ?? 'new',
          };
        });

        setAlerts(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error parsing alerts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading alerts...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load alerts: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <li key={alert.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${alert.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                <AlertTriangle className={`h-5 w-5 ${alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {alert.description}
                </p>
                <p className="text-sm text-gray-500">
                  {alert.location} • {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="flex items-center">
                {alert.status === 'new' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    New
                  </span>
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
