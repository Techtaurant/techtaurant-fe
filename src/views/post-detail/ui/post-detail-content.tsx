import { renderPostMarkdown } from '@/shared/lib/markdown/render-post-markdown';

type Props = {
  content: string;
};

export function PostDetailContent({ content }: Props) {
  const html = renderPostMarkdown(content);

  return (
    <section
      className="text-foreground mb-12 text-base leading-8 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
