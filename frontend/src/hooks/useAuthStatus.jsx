import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/features/auth/authSlice.js';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector(authSelector.getAll);

  useEffect(() => {
    setLoggedIn(!!user);
    setCheckingStatus(false);
  }, [user]);

  return {
    loggedIn,
    checkingStatus,
  };
};
