import { Share2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';

type Props = {
  onShare: () => void;
};

export function PostDetailShareButton({ onShare }: Props) {
  return (
    <Button
      variant="icon"
      size="sm"
      className="h-9 w-9 rounded-full px-0 hover:bg-transparent"
      title="공유하기"
      onClick={onShare}
    >
      <Share2 className="h-5 w-5 md:h-6 md:w-6" />
    </Button>
  );
}
