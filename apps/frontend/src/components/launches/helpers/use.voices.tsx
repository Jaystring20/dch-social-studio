'use client';

import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useCallback } from 'react';
import useSWR from 'swr';

export const useVoices = () => {
  const fetch = useFetch();

  const load = useCallback(async (path: string) => {
    return (await fetch(path)).json();
  }, []);

  return useSWR('/posts/voices', load, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    fallbackData: [],
  });
};
