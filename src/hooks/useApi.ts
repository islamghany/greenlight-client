import { errorNorm } from '@/helpers';
import React, { useEffect, useState } from 'react';
import { useApiStatus } from './useApiStatus';
import { PENDING, SUCCESS, ERROR } from '@/constants/apiStatus';

interface UseApiConfig<T, F> {
  initialData?: T;
  enabledData?: F;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  onSettled?: (data: T | null, error: any) => void;
}

type ApiFunction<T = unknown> = (...args: any[]) => T | Promise<T>;

export function useApi<TData = unknown, F = unknown>(
  fn: ApiFunction<TData>,
  config: UseApiConfig<TData, F> = {}
) {
  const {
    initialData,
    onError,
    onSuccess,
    onSettled,
    enabledData,
    enabled = false,
  } = config;
  const [data, setData] = useState(initialData);
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();
  const [error, setError] = useState<string | undefined>();

  const exec = async <A>(...args: A[]) => {
    try {
      setStatus(PENDING);
      const data = await fn(...args);
      setData(data);
      setStatus(SUCCESS);
      onSuccess?.(data);
      onSettled?.(data, null);
      return {
        data,
        error: null,
      };
    } catch (err) {
      const error = errorNorm(err).name as string;
      setError(error);
      setStatus(ERROR);
      onError?.(err);
      onSettled?.(null, error);
      return {
        data: null,
        error,
      };
    }
  };
  useEffect(() => {
    if (enabledData !== undefined && enabled) {
      exec(enabledData);
    }
  }, []);
  return {
    exec,
    data,
    setData,
    status,
    setStatus,
    error,
    setError,
    ...normalisedStatuses,
  };
}
