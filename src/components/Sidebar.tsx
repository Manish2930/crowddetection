// Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  Users,
  Bell,
  Map,
  FileText,
  Settings,
  Shield,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/cameras', icon: Camera, label: 'Cameras' },
  { path: '/security', icon: Users, label: 'Security Personnel' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/evacuation', icon: Map, label: 'Evacuation Routes' },
  { path: '/insights', icon: BarChart3, label: 'Insights' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4 flex items-center space-x-2">
        <Shield className="h-8 w-8 text-blue-400" />
        <span className="text-xl font-bold">Synergy Safety</span>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                isActive ? 'bg-gray-800 text-white' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

// Insights.tsx
