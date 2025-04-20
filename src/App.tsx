import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useRole } from './context/rolecontext';

// Pages
import { Login } from './pages/Login'; // ⬅️ Make sure this file exists

// Admin Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Cameras } from './pages/Cameras';
import { SecurityPersonnel } from './pages/SecurityPersonnel';
import { Alerts } from './pages/Alerts';
import { EvacuationRoutes } from './pages/EvacuationRoutes';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import Insights from './pages/Insights'; // Ensure this file exists or create it if missing

<Route path="/insights" element={<Insights />} />

// Security Component
import { SecurityDashboard } from './pages/SecurityDashboard';

function App() {
  const { role } = useRole();

  return (
    <Router>
      <Routes>
        {/* Login route for all */}
        <Route path="/login" element={<Login />} />

        {/* Admin layout with sidebar & header */}
        {role === 'admin' && (
          <Route
            path="/*"
            element={
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Header />
                  <main className="p-6 mt-16">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/cameras" element={<Cameras />} />
                      <Route path="/security" element={<SecurityPersonnel />} />
                      <Route path="/alerts" element={<Alerts />} />
                      <Route path="/evacuation" element={<EvacuationRoutes />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/insights" element={<Insights />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        )}

        {/* Security personnel dashboard */}
        {role === 'security' && (
          <Route path="/*" element={<SecurityDashboard />} />
        )}

        {/* No role yet? Force login */}
        {!role && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
}

export default App;
