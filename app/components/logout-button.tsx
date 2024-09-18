import { useRouter } from 'next/navigation';
import { LOGIN_PAGE } from '@/app/utils/routes';
import { useAuth } from '@/app/utils/auth-context';

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleUserLogout = () => {
    logout();
    router.push(LOGIN_PAGE);
  };
  return <button onClick={handleUserLogout}>Logout</button>;
};

export default LogoutButton;
