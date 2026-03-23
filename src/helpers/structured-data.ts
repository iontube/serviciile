const SITE = 'https://serviciile.ro';

export function buildWebSiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'serviciile.ro', url: SITE, inLanguage: 'ro',
    description: 'Informații practice despre servicii în România.',
    publisher: { '@type': 'Organization', name: 'serviciile.ro', url: SITE },
  });
}

export function buildWebPageSchema(title: string, desc: string, url: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebPage',
    name: title, description: desc, url: SITE + url, inLanguage: 'ro',
    isPartOf: { '@type': 'WebSite', name: 'serviciile.ro', url: SITE },
  });
}

export function buildBreadcrumbSchema(items: Array<{label: string; href?: string}>): string {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.label,
      ...(item.href ? { item: SITE + item.href } : {}),
    })),
  });
}

export function buildServiceSchema(serviciu: string, oras: string, descriere: string, url: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${serviciu} în ${oras}`,
    description: descriere,
    url: SITE + url,
    areaServed: {
      '@type': 'City',
      name: oras,
      containedInPlace: { '@type': 'Country', name: 'România' },
    },
    provider: {
      '@type': 'Organization',
      name: 'serviciile.ro',
      url: SITE,
    },
  });
}

export function buildFAQSchema(items: Array<{question: string; answer: string}>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}

export function buildItemListSchema(items: Array<{name: string; url: string}>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Thing', name: item.name, url: SITE + item.url },
    })),
  });
}
