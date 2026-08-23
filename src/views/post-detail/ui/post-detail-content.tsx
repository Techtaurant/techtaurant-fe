import { type PostMarkdownAttachment, renderPostMarkdown } from '@/shared/lib/markdown/render-post-markdown';

type Props = {
  attachmentPresignedUrls?: readonly PostMarkdownAttachment[];
  content: string;
};

export function PostDetailContent({ attachmentPresignedUrls, content }: Props) {
  const html = renderPostMarkdown(content, attachmentPresignedUrls);

  return (
    <section
      className="text-foreground mb-12 text-base leading-8 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
