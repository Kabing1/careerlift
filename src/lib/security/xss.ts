const ALLOWED_TAGS = [
  'a', 'b', 'br', 'div', 'em', 'i', 'li', 'ol', 'p', 'span', 'strong', 'ul'
];

const ALLOWED_ATTRIBUTES = {
  'a': ['href', 'title', 'target'],
  '*': ['class', 'id']
};

export function sanitizeHTML(dirty: string): string {
  // Simple HTML sanitizer
  const doc = new DOMParser().parseFromString(dirty, 'text/html');
  const clean = sanitizeNode(doc.body);
  return clean.innerHTML;
}

function sanitizeNode(node: Node): Node {
  const clone = node.cloneNode(false);

  if (node instanceof Element) {
    // Check if tag is allowed
    if (!ALLOWED_TAGS.includes(node.tagName.toLowerCase())) {
      return document.createTextNode(node.textContent || '');
    }

    // Filter attributes
    Array.from(node.attributes).forEach(attr => {
      const tagAllowedAttrs = ALLOWED_ATTRIBUTES[node.tagName.toLowerCase()] || [];
      const globalAllowedAttrs = ALLOWED_ATTRIBUTES['*'] || [];
      
      if (!tagAllowedAttrs.includes(attr.name) && !globalAllowedAttrs.includes(attr.name)) {
        (clone as Element).removeAttribute(attr.name);
      }
    });
  }

  // Recursively sanitize child nodes
  node.childNodes.forEach(child => {
    clone.appendChild(sanitizeNode(child));
  });

  return clone;
}