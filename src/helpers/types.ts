export interface Serviciu {
  slug: string;
  nume: string;
  categorie: string;
  descriere: string;
}

export interface Oras {
  slug: string;
  nume: string;
  regiune: string;
  populatie: number;
}

export interface Categorie {
  slug: string;
  nume: string;
  servicii: string[];
}

export interface Sectiune {
  titlu: string;
  tip: 'lista' | 'pasi' | 'text';
  items: Array<{ titlu?: string; text: string }>;
}

export interface Pagina {
  slug: string;
  titlu: string;
  serviciuSlug: string;
  orasSlug: string;
  orasNume: string;
  tip: 'oras' | 'faq';
  intro: string;
  sectiuni: Sectiune[];
  concluzie: string;
  metaTitle: string;
  metaDescription: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
