import React from 'react';
import SecurityProfile from '../components/SecurityProfile';
import AlertInbox from '../components/AlertInbox';
import SendAlert from '../components/SendAlert';
import ChatPanel from '../components/ChatPanel';

const SecurityPage = () => {
  const securityUserId = 'security-007'; // Replace with actual auth/user info
  const userRole = 'security' as const;

  return (
    <div className="p-6 md:p-10 space-y-10 bg-gray-50 min-h-screen">
      {/* Security Profile Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Security Profile</h2>
        <SecurityProfile />
      </section>

      {/* Alerts and Send Alert Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Incoming Alerts</h2>
          <AlertInbox />
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Send New Alert</h2>
          <SendAlert />
        </div>
      </section>

      {/* Real-time Communication Panel */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Real-time Chat with Other Security Units</h2>
        <ChatPanel userId={securityUserId} userRole={userRole} />
      </section>
    </div>
  );
};

export default SecurityPage;