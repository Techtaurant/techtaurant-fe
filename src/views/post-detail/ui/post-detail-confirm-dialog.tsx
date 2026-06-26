'use client';

import { Button } from '@/shared/ui/button';

type Props = {
  cancelLabel: string;
  confirmLabel: string;
  description: string;
  isConfirming: boolean;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  title: string;
};

const DIALOG_BUTTON_CLASS_NAME =
  'h-10 min-w-[136px] flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold whitespace-nowrap';

export function PostDetailConfirmDialog({
  cancelLabel,
  confirmLabel,
  description,
  isConfirming,
  isOpen,
  onCancel,
  onConfirm,
  title,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (isConfirming) return;

        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="bg-background w-full max-w-xs rounded-2xl p-5 shadow-xl">
        <h2 className="text-foreground text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{description}</p>

        <div className="mt-5 flex justify-center">
          <div className="flex w-full min-w-0 flex-wrap gap-2">
            <Button variant="neutral" className={DIALOG_BUTTON_CLASS_NAME} disabled={isConfirming} onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button
              variant="danger"
              className={DIALOG_BUTTON_CLASS_NAME}
              disabled={isConfirming}
              onClick={() => {
                void onConfirm();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
