import React from 'react';

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Security Reports</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Generate New Report
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium">Recent Reports</h3>
          </div>
          
          <div className="space-y-3">
            {/* Sample report entries */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Monthly Security Overview</h4>
                <p className="text-sm text-gray-600">Generated on March 1, 2024</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Report
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Incident Analysis Report</h4>
                <p className="text-sm text-gray-600">Generated on February 28, 2024</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Report
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Access Control Audit</h4>
                <p className="text-sm text-gray-600">Generated on February 25, 2024</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}