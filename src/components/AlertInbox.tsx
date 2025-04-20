import { AlertTriangle, CheckCircle2 } from 'lucide-react';

type Alert = {
  id: number;
  location: string;
  description: string;
  time: string;
  status: 'new' | 'acknowledged';
};

const alerts: Alert[] = [
  {
    id: 1,
    location: 'VIP Lounge',
    description: 'Crowd gathering observed',
    time: '02:10 PM',
    status: 'new',
  },
  {
    id: 2,
    location: 'North Exit - Wing B',
    description: 'Suspicious movement',
    time: '01:45 PM',
    status: 'acknowledged',
  },
  {
    id: 3,
    location: 'Main Concourse',
    description: 'Medical emergency reported',
    time: '01:20 PM',
    status: 'acknowledged',
  },
];

const AlertInbox = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Alerts from Admin</h2>
      </div>
      <div className="p-4 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start p-4 rounded-lg border ${
              alert.status === 'new'
                ? 'border-yellow-300 bg-yellow-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0 mr-4">
              {alert.status === 'new' ? (
                <AlertTriangle className="text-yellow-500 w-6 h-6" />
              ) : (
                <CheckCircle2 className="text-green-500 w-6 h-6" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.description}</p>
              <p className="text-sm text-gray-600">
                {alert.location} • {alert.time}
              </p>
              {alert.status === 'new' && (
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  New
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertInbox;
