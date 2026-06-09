import sanitizeHtml from 'sanitize-html'

const sanitizeConfig: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img', 'h1', 'h2', 'figure', 'figcaption', 'mark', 'u', 's',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class'],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
  },
  allowedSchemes: ['https', 'http', 'mailto'],
}

export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, sanitizeConfig)
}
