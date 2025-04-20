import React, { createContext, useContext, useState } from 'react';

type RoleContextType = {
  role: 'admin' | 'security' | null;
  setRole: (role: 'admin' | 'security') => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [role, setRole] = useState<'admin' | 'security' | null>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};