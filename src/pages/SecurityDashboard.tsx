import SecurityProfile from '../components/SecurityProfile';
import AlertInbox from '../components/AlertInbox';
import SendAlert from '../components/SendAlert';
import ChatPanel from '../components/ChatPanel'; 

export function SecurityDashboard() {
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SecurityProfile />
        {/* You can replace this with a component like SecuritySettings if needed */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center text-gray-500">
          No settings available
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AlertInbox />
        <SendAlert />
      </div>

      <ChatPanel userId="security-007" userRole="security" />
    </div>
  );
}
