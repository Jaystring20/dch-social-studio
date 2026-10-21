'use client';

import { FC, useCallback, useState } from 'react';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useToaster } from '@gitroom/react/toaster/toaster';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { Button } from '@gitroom/react/form/button';
import { useIntegrationList } from '@gitroom/frontend/components/launches/helpers/use.integration.list';
import { useRepurposeBrief } from '@gitroom/frontend/components/launches/helpers/use.repurpose.brief';
import { useSWRConfig } from 'swr';

/**
 * Repurposing without an AI key: copy the brief into Claude, then paste each
 * channel's version back here. Saving creates one draft per filled channel.
 */
export const RepurposeDraftModal: FC<{ postId: string; close: () => void }> = ({
  postId,
  close,
}) => {
  const fetch = useFetch();
  const toaster = useToaster();
  const t = useT();
  const { mutate } = useSWRConfig();
  const { data: integrations } = useIntegrationList();
  const { data: brief, isLoading } = useRepurposeBrief(postId);
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const channels = (integrations || []).filter((i: any) => !i.disabled);
  const filled = channels.filter((i: any) => variants[i.id]?.trim());

  const copyBrief = useCallback(async () => {
    await navigator.clipboard.writeText(brief || '');
    toaster.show(t('brief_copied', 'Brief copied'));
  }, [brief]);

  const save = useCallback(async () => {
    setSaving(true);
    const response = await fetch('/posts/repurpose', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        variants: filled.map((i: any) => ({
          integrationId: i.id,
          content: variants[i.id].trim(),
        })),
      }),
    });
    setSaving(false);

    if (!response.ok) {
      const { message } = await response.json().catch(() => ({}));
      toaster.show(
        typeof message === 'string'
          ? message
          : t('repurpose_failed', 'Could not save the drafts'),
        'warning'
      );
      return;
    }

    mutate((key) => typeof key === 'string' && key.startsWith('/posts'));
    toaster.show(t('repurposed_drafts_saved', 'Drafts saved'));
    close();
  }, [postId, filled, variants]);

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        <div className="text-[14px] font-[600]">
          {t('step_1_copy_brief', '1. Copy the brief into Claude')}
        </div>
        <textarea
          readOnly
          value={isLoading ? '' : brief || ''}
          className="w-full h-[160px] p-[12px] rounded-[8px] bg-input border border-tableBorder text-textColor font-mono text-[13px] resize-y"
        />
        <Button onClick={copyBrief} disabled={!brief} className="rounded-[4px]">
          {t('copy_brief', 'Copy brief')}
        </Button>
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="text-[14px] font-[600]">
          {t('step_2_paste_versions', '2. Paste each channel’s version')}
        </div>
        {channels.map((integration: any) => (
          <div key={integration.id} className="flex flex-col gap-[4px]">
            <div className="text-[13px] text-textColor/70">
              {integration.name}
            </div>
            <textarea
              value={variants[integration.id] || ''}
              onChange={(e) =>
                setVariants((prev) => ({
                  ...prev,
                  [integration.id]: e.target.value,
                }))
              }
              className="w-full h-[100px] p-[12px] rounded-[8px] bg-input border border-tableBorder text-textColor text-[14px] resize-y"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={save}
          loading={saving}
          disabled={filled.length === 0}
          className="rounded-[4px]"
        >
          {t('save_as_drafts', 'Save as drafts')}
        </Button>
      </div>
    </div>
  );
};
