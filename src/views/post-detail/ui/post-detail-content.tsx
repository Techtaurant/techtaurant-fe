type Props = {
  content: string;
};

export function PostDetailContent({ content }: Props) {
  return (
    <section className="text-foreground mb-12 text-base leading-8 wrap-break-word whitespace-pre-wrap">
      {content}
    </section>
  );
}
