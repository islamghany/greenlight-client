import Spinner from '@/components/Spinner';
import { useAppDispatch } from '@/store';
import { useGetCurrentUserQuery } from '@/store/api';
import { setUser } from '@/store/slices/userSlice';
import { useEffect } from 'react';

const WithUser = (props: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetCurrentUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof data !== 'undefined') {
      dispatch(setUser(data.user!));
    }
  }, [isLoading]);
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return <>{props.children}</>;
};

export default WithUser;
