import { Camera, Users, AlertTriangle, Map } from 'lucide-react';
import { AlertList } from '../components/AlertList';

export function Dashboard() {
  const stats = [
    {
      title: 'Active Cameras',
      value: '10/10',
      icon: Camera,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Security Personnel',
      value: '12 Active',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Alerts',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Evacuation Routes',
      value: 'All Clear',
      icon: Map,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
  <div className="p-4 border-b border-gray-200">
    <h2 className="text-lg font-medium text-gray-900">Live Camera Feeds</h2>
  </div>
  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      {
        zone: 'Zone 1',
url: 'https://synergy-crowd-videos.s3.us-east-1.amazonaws.com/zone_A/WhatsApp+Video+2025-04-18+at+2.51.12+PM.mp4',
      },
      {
        zone: 'Zone 2',
        url: 'https://synergy-crowd-videos.s3.us-east-1.amazonaws.com/zone_B/WhatsApp+Video+2025-04-18+at+2.51.26+PM.mp4',
      },
      {
        zone: 'Zone 3',
url: 'https://synergy-crowd-videos.s3.us-east-1.amazonaws.com/zone_C/gettyimages-1094544726-640_adpp.mp4',
      },
      {
        zone: 'Zone 4',
        url: 'https://synergy-crowd-videos.s3.us-east-1.amazonaws.com/zone_D/gettyimages-1125620349-640_adpp.mp4',
      },
      {
        zone: 'Zone 5',
        url: 'https://synergy-crowd-videos.s3.us-east-1.amazonaws.com/zone_E/gettyimages-105823792-640_adpp.mp4',
      },
    ].map((video, idx) => (
      <div key={idx} className="bg-gray-100 p-3 rounded-lg shadow">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{video.zone}</h3>
        <video
          src={video.url}
          autoPlay
          muted
          loop
          
          className="w-full rounded-lg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ))}
  </div>
</div>



        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
          </div>
          <div className="p-4">
            <AlertList />
          </div>
        </div>
    </div>
  );
}