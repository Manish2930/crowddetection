import React, { useState, useEffect } from 'react';
import { Camera, Activity } from 'lucide-react';
import axios from 'axios';
// import type { CameraData } from '../types';

interface CameraData {
  id: string;
  location: string;
  crowd_density: number;
  movement_level: number;
  // movement_level property is already declared above, removing this duplicate line
  status: string;
  last_update: string;
  stream_url: string;
  [key: string]: unknown; // for metadata or additional fields
}

const CameraGrid = () => {
  const [cameras, setCameras] = useState<CameraData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get('https://rtvg6eun69.execute-api.us-east-1.amazonaws.com/kkk');

        console.log("Raw API Response:", response.data.body);

        // ✅ Parse the body string before accessing `items`
        const parsedBody = JSON.parse(response.data.body);

        // Removed unused variable 'camerasArray'

        const parsedData = (parsedBody.items as unknown[]).map((cam) => {
          const camera = cam as CameraData;
        
          return {
            ...camera,
            lastUpdate: new Date(camera.last_update as string),
          };
        });

        setCameras(parsedData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch camera data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  if (loading) return <div>Loading cameras...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cameras.map((camera: CameraData) => (
        <div key={camera.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-gray-500" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">{camera.location}</h3>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              camera.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {camera.status}
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Crowd Density</span>
                <span>{camera.crowd_density}%</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    camera.crowd_density > 80 ? 'bg-red-500' :
                    camera.crowd_density > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${camera.crowd_density}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Movement Level</span>
                <span>{camera.movement_level}%</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${camera.movement_level}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <Activity className="h-4 w-4" />
            <span className="ml-1">
              Last updated: {new Date(camera.lastUpdate as string).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default CameraGrid;
