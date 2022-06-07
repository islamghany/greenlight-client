import React, { useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Button from '@/components/Button';
import { fetchCurrentUser, getUser, userSlice } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import Alert from '@/components/Alert';
export default function Home() {
  const userStatus = useAppSelector((state) => state.user.fetchUserStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <div>
      <Alert type="info" title="warngin">
        Hello There
      </Alert>
    </div>
  );
}
