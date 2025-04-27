import { useState, useCallback } from 'react';
import type { ApiResponse } from '@/types/poetry';
import { apiClient } from '@/lib/api-client';

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
    setState((prev: UseApiState<T>) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiCall();
      setState({
        data: response.data,
        error: null,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({
        data: null,
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  }, []);

  return {
    ...state,
    execute,
  };
}

// Specific hooks for common API operations
export function useSearchPoems() {
  const { data, error, isLoading, execute } = useApi();
  
  const search = useCallback(async (params: Parameters<typeof apiClient.searchPoems>[0]) => {
    return execute(() => apiClient.searchPoems(params));
  }, [execute]);

  return { data, error, isLoading, search };
}

export function useDailyVerse() {
  const { data, error, isLoading, execute } = useApi();
  
  const fetchDailyVerse = useCallback(async () => {
    return execute(() => apiClient.getDailyVerse());
  }, [execute]);

  return { data, error, isLoading, fetchDailyVerse };
}

export function useMasnaviVolume() {
  const { data, error, isLoading, execute } = useApi();
  
  const fetchVolume = useCallback(async (volumeNum: number) => {
    return execute(() => apiClient.getMasnaviVolume(volumeNum));
  }, [execute]);

  return { data, error, isLoading, fetchVolume };
} 