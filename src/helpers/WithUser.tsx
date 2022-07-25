import Spinner from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCurrentUser } from '@/store/slices/userSlice';
import { useEffect } from 'react';

const WithUser = (props: { children: React.ReactNode }) => {
  const fetchUserStatus = useAppSelector((state) => state.user.fetchUserStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  if (fetchUserStatus === 'PENDING' || fetchUserStatus === 'IDLE') {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return <>{props.children}</>;
};

export default WithUser;
