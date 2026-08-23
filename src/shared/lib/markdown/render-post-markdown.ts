import DOMPurify from 'isomorphic-dompurify';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
  html: true,
  langPrefix: 'language-',
  linkify: true,
});

export type PostMarkdownAttachment = {
  attachmentId: string;
  presignedUrl: string;
};

type MarkdownRenderEnvironment = {
  attachmentImageSources?: ReadonlyMap<string, string>;
};

const defaultImageRenderer = markdown.renderer.rules.image;

markdown.renderer.rules.image = (tokens, index, options, environment, renderer) => {
  const imageToken = tokens[index];
  const imageSource = imageToken.attrGet('src');
  const attachmentImageSources = (environment as MarkdownRenderEnvironment).attachmentImageSources;
  const resolvedImageSource = imageSource ? attachmentImageSources?.get(imageSource) : undefined;

  if (resolvedImageSource) {
    imageToken.attrSet('src', resolvedImageSource);
  }

  if (defaultImageRenderer) {
    return defaultImageRenderer(tokens, index, options, environment, renderer);
  }

  return renderer.renderToken(tokens, index, options);
};

const ALLOWED_TAGS = [
  'a',
  'abbr',
  'b',
  'bdi',
  'bdo',
  'blockquote',
  'br',
  'caption',
  'code',
  'col',
  'colgroup',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'kbd',
  'li',
  'mark',
  'ol',
  'p',
  'picture',
  'pre',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'u',
  'ul',
  'var',
  'wbr',
];

const ALLOWED_ATTRIBUTES = [
  'abbr',
  'align',
  'alt',
  'cite',
  'class',
  'colspan',
  'datetime',
  'dir',
  'headers',
  'height',
  'href',
  'loading',
  'media',
  'open',
  'rel',
  'reversed',
  'rowspan',
  'sizes',
  'span',
  'src',
  'srcset',
  'start',
  'target',
  'title',
  'type',
];

const ALLOWED_URI = /^(?:(?:https?|mailto):|(?:\/|#|\?))/i;

/**
 * Converts untrusted post markdown to HTML that is safe for the post-detail
 * rendering boundary.
 */
export function renderPostMarkdown(
  markdownSource: string,
  attachments: readonly PostMarkdownAttachment[] = [],
): string {
  const attachmentImageSources = new Map(
    attachments.map(({ attachmentId, presignedUrl }) => [attachmentId, presignedUrl]),
  );
  const renderedHtml = markdown.render(markdownSource, { attachmentImageSources });

  return DOMPurify.sanitize(renderedHtml, {
    ALLOWED_ATTR: ALLOWED_ATTRIBUTES,
    ALLOWED_TAGS,
    ALLOWED_URI_REGEXP: ALLOWED_URI,
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
  });
}
