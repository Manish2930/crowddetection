import React, { useEffect, useState } from 'react';
import { AlertTriangle, MapPin, Users } from 'lucide-react';

type EvacuationRoute = {
  id: string;
  name: string;
  status: 'open' | 'closed' | 'blocked';
  crowdDensity: number;
  lastUpdate: string;
};

export function EvacuationRoutes() {
  const [routes, setRoutes] = useState<EvacuationRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://c6zkr3jarb.execute-api.us-east-1.amazonaws.com/eee')
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data.body);
        setRoutes(parsed.items || []);
      })
      .catch((err) => {
        console.error('API error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: string) => {
    if (status === 'open') {
      return <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs">Clear</span>;
    }
    if (status === 'blocked') {
      return <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-full text-xs">Blocked</span>;
    }
    return <span className="text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full text-xs">Congested</span>;
  };

  const getBarColor = (density: number) => {
    if (density >= 80) return 'bg-red-500';
    if (density >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Evacuation Routes</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Routes
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Trigger Evacuation
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading routes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div key={route.id} className="p-5 bg-white rounded-xl shadow-md space-y-3 border border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  {route.name}
                </div>
                {getStatusBadge(route.status)}
              </div>

              <div className="flex items-center text-sm text-gray-600 gap-2">
                <Users className="w-4 h-4" />
                Crowd Density
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${getBarColor(route.crowdDensity)} h-2.5 rounded-full`}
                  style={{ width: `${route.crowdDensity}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{route.crowdDensity}%</p>

              {route.status === 'blocked' && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Route blocked - Use alternative exit
                </div>
              )}

              <p className="text-xs text-gray-400">
                Last updated: {formatTime(route.lastUpdate)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
