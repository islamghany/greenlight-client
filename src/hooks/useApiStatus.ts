import React, { useMemo, useState } from 'react';
import { IDLE, defaultApiStatuses, ApiStatus } from '@/constants/apiStatus';

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>;

const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase() + s.slice(1);

const prepareStatuses = (currentStatus: ApiStatus) => {
  const statuses = {} as Statuses;

  for (const status of defaultApiStatuses) {
    const normalizedStatus = capitalize(status.toLocaleLowerCase());
    const normalizedStatusKey = `is${normalizedStatus}` as keyof Statuses;
    statuses[normalizedStatusKey] = status === currentStatus;
  }

  return statuses;
};

export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState(currentStatus);

  const statuses = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};
