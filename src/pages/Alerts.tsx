import React from 'react';
import { AlertList } from '../components/AlertList';

export function Alerts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Alert Management</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Mark All as Read
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Configure Alerts
          </button>
        </div>
      </div>
      <AlertList />
    </div>
  );
}