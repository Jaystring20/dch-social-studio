'use client';

import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useCallback } from 'react';
import useSWR from 'swr';

export interface WritingOptions {
  voices: { id: string; name: string }[];
  formats: { id: string; name: string }[];
  hooks: { id: number; name: string; template: string; example: string; trap: string }[];
  stories: { id: string; name: string }[];
}

export const useWritingOptions = () => {
  const fetch = useFetch();

  const load = useCallback(async (path: string) => {
    return (await fetch(path)).json();
  }, []);

  return useSWR<WritingOptions>('/posts/writing-options', load, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
