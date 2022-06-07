import React, { useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Button from '@/components/Button';
import { fetchCurrentUser, userSlice } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import Alert from '@/components/Alert';
import { useApi } from '@/hooks/useApi';
import api from '@/api';
export default function Home() {
  return (
    <div>
      <Alert type="info" title="warngin">
        Hello There
      </Alert>
    </div>
  );
}
