import { useRole } from '../context/rolecontext';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const logout = () => {
    setRole('security'); // or 'admin', depending on your default role
    navigate('/login');
  };

  return (
    <button onClick={logout} className="text-red-500 hover:underline">
      Logout
    </button>
  );
}
