import React from 'react';
import CameraGrid from '../components/CameraGrid';

export function Cameras() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Camera Monitoring</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Camera
        </button>
      </div>
      <CameraGrid />
    </div>
  );
}