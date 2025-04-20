import React from 'react';
import SecurityProfile from '../components/SecurityProfile';
import AlertInbox from '../components/AlertInbox';
import SendAlert from '../components/SendAlert';
import ChatPanel from '../components/ChatPanel';

const SecurityPage = () => {
  const securityUserId = 'security-007'; // Replace with actual auth/user info
  const userRole = 'security' as const;

  return (
    <div className="p-6 space-y-8">
      {/* Profile Card */}
      <SecurityProfile />

      {/* Grid layout for alerts and sending alert */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertInbox />
        <SendAlert />
      </div>

      {/* Real-time Chat */}
      <ChatPanel userId={securityUserId} userRole={userRole} />
    </div>
  );
};

export default SecurityPage;
