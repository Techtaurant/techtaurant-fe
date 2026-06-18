'use client';

import { X } from 'lucide-react';

import { Button } from '@/shared/ui/button';

type Props = {
  title: string;
  description?: string;
  onClose: () => void;
  closeDisabled?: boolean;
};

export function ModalHeader({ title, description, onClose, closeDisabled }: Props) {
  return (
    <div className="border-border/70 flex items-center justify-between border-b px-6 py-5">
      <div>
        <p className="text-lg font-semibold">{title}</p>
        {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
      </div>
      <Button variant="icon" size="sm" className="h-9 w-9 rounded-full px-0" disabled={closeDisabled} onClick={onClose}>
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
