'use client';

import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useCallback } from 'react';
import useSWR from 'swr';

export const useRepurposeBrief = (postId: string) => {
  const fetch = useFetch();

  const load = useCallback(async (path: string) => {
    return (await fetch(path)).text();
  }, []);

  return useSWR(`/posts/${postId}/repurpose-brief`, load, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
