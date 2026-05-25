import { cn } from '@/shared/lib/cn';

type Props = {
  title: string;
  content: string;
};

// TODO: 본문 미리보기용 content sanitizing 적용 (sanitizePostPreview)
export function PostPreview({ title, content }: Props) {
  return (
    <>
      <h2 className={cn('mb-2 line-clamp-2 block text-lg font-bold', 'md:mb-3 md:text-xl')}>{title}</h2>
      <p
        className={cn(
          'text-muted-foreground mb-3 line-clamp-2 text-sm leading-relaxed whitespace-normal',
          'md:line-clamp-3 md:text-base',
        )}
      >
        {content}
      </p>
    </>
  );
}
