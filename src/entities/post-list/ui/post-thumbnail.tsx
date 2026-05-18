import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

const DEFAULT_IMAGE_SIZES = '(min-width: 768px) 200px, 100vw';

export function PostThumbnail({ src, alt, className, sizes }: Props) {
  return (
    <div
      className={cn(
        'bg-muted relative h-40 w-full shrink-0 overflow-hidden rounded-md',
        'md:h-33.5 md:w-50',
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes={sizes ?? DEFAULT_IMAGE_SIZES} className="object-cover" />
    </div>
  );
}
