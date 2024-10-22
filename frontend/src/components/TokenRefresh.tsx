import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const TokenRefresh = () => {
  const { refreshToken } = useAuth();

  useEffect(() => {
    // Refresh token every 14 minutes (assuming tokens expire in 15 minutes)
    const interval = setInterval(() => {
      refreshToken().catch(console.error);
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  return null;
};

export default TokenRefresh;