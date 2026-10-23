'use client';

import { FC, useCallback, useState } from 'react';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useToaster } from '@gitroom/react/toaster/toaster';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { Button } from '@gitroom/react/form/button';
import { useWritingOptions } from '@gitroom/frontend/components/launches/helpers/use.writing.options';

const selectClass =
  'w-full h-[44px] px-[12px] rounded-[8px] bg-input border border-tableBorder text-textColor text-[14px]';

/**
 * Writing screen: choose the voice, format, hook and story, add the topic, and
 * build the brief. The brief is copied into Claude. The draft comes back here
 * to be checked and saved through the usual route.
 */
export const WritingBriefModal: FC<{ close: () => void }> = ({ close }) => {
  const fetch = useFetch();
  const toaster = useToaster();
  const t = useT();
  const { data: options } = useWritingOptions();
  const [voiceId, setVoiceId] = useState('buildwithja');
  const [formatId, setFormatId] = useState('post');
  const [hookId, setHookId] = useState('');
  const [storyId, setStoryId] = useState('human-to-system');
  const [topic, setTopic] = useState('');
  const [brief, setBrief] = useState('');
  const [building, setBuilding] = useState(false);

  const build = useCallback(async () => {
    setBuilding(true);
    const response = await fetch('/posts/writing-brief', {
      method: 'POST',
      body: JSON.stringify({
        voiceId,
        formatId,
        storyId,
        ...(hookId ? { hookId: Number(hookId) } : {}),
        topic,
      }),
    });
    setBuilding(false);

    if (!response.ok) {
      toaster.show(t('brief_failed', 'Could not build the brief'), 'warning');
      return;
    }
    setBrief(await response.text());
  }, [voiceId, formatId, storyId, hookId, topic]);

  const copyBrief = useCallback(async () => {
    await navigator.clipboard.writeText(brief);
    toaster.show(t('brief_copied', 'Brief copied'));
  }, [brief]);

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid gap-[12px] sm:grid-cols-2">
        <label className="flex flex-col gap-[4px] text-[13px] text-textColor/70">
          {t('voice', 'Voice')}
          <select className={selectClass} value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
            {(options?.voices || []).map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-[4px] text-[13px] text-textColor/70">
          {t('format', 'Format')}
          <select className={selectClass} value={formatId} onChange={(e) => setFormatId(e.target.value)}>
            {(options?.formats || []).map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-[4px] text-[13px] text-textColor/70">
          {t('hook', 'Hook')}
          <select className={selectClass} value={hookId} onChange={(e) => setHookId(e.target.value)}>
            <option value="">{t('no_hook', 'No hook')}</option>
            {(options?.hooks || []).map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-[4px] text-[13px] text-textColor/70">
          {t('story', 'Story structure')}
          <select className={selectClass} value={storyId} onChange={(e) => setStoryId(e.target.value)}>
            {(options?.stories || []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-[4px] text-[13px] text-textColor/70">
        {t('topic', 'Topic, with the source and the point you want to make')}
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full h-[120px] p-[12px] rounded-[8px] bg-input border border-tableBorder text-textColor text-[14px] resize-y"
        />
      </label>

      <div className="flex justify-end">
        <Button onClick={build} loading={building} disabled={topic.trim().length < 3} className="rounded-[4px]">
          {t('build_brief', 'Build brief')}
        </Button>
      </div>

      {brief && (
        <div className="flex flex-col gap-[8px]">
          <textarea
            readOnly
            value={brief}
            className="w-full h-[260px] p-[12px] rounded-[8px] bg-input border border-tableBorder text-textColor font-mono text-[13px] resize-y"
          />
          <div className="flex justify-between gap-[8px]">
            <Button onClick={copyBrief} className="rounded-[4px]">
              {t('copy_brief', 'Copy brief')}
            </Button>
            <Button onClick={close} className="rounded-[4px]">
              {t('done', 'Done')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
