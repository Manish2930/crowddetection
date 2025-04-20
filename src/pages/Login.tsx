import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/rolecontext';
import { ShieldCheckIcon, UserIcon } from '@heroicons/react/24/solid';

export function Login() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleLogin = (selectedRole: 'admin' | 'security') => {
    setRole(selectedRole);
    navigate('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/crowd.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Login Box */}
      <div className="relative z-10 bg-white bg-opacity-95 px-16 py-14 rounded-xl shadow-2xl space-y-8 w-[480px]">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login As:</h2>

        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-3 transition duration-200"
          onClick={() => handleLogin('admin')}
        >
          <UserIcon className="w-6 h-6 text-white" />
          Admin
        </button>

        <button
          className="w-full bg-sky-800 text-white py-3 rounded-lg hover:bg-sky-900 flex items-center justify-center gap-3 transition duration-200"
          onClick={() => handleLogin('security')}
        >
          <ShieldCheckIcon className="w-6 h-6 text-white" />
          Security Personnel
        </button>
      </div>
    </div>
  );
}
