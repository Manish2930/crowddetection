import { useEffect, useState } from 'react';
import { Users, MapPin, Clock } from 'lucide-react';
import type { SecurityPersonnel as SecurityPersonnelType } from '../types';

export function SecurityPersonnel() {
  const [personnel, setPersonnel] = useState<SecurityPersonnelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch('https://asds801wla.execute-api.us-east-1.amazonaws.com/dddd');
        const json = await response.json();
        console.log('API response:', JSON.parse(json.body)); // See structure in console
  
        setPersonnel(JSON.parse(json.body).items);
      } catch (error) {
        console.error('Failed to fetch personnel:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPersonnel();
  }, []);
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Security Personnel</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Personnel
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personnel && personnel.map((person) => (
            <div key={person.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    person.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {person.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{person.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Last updated: {new Date(person.lastUpdate).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
