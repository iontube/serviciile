import type { Serviciu, Oras, Categorie, Pagina } from './types';
import serviciiData from '../data/servicii.json';
import oraseData from '../data/orase.json';
import categoriiData from '../data/categorii.json';

export const servicii: Serviciu[] = serviciiData as Serviciu[];
export const orase: Oras[] = oraseData as Oras[];
export const categorii: Categorie[] = categoriiData as Categorie[];

// Lazy-load pagini per serviciu
const paginiCache = new Map<string, Pagina[]>();

function loadPagini(serviciuSlug: string): Pagina[] {
  if (paginiCache.has(serviciuSlug)) return paginiCache.get(serviciuSlug)!;
  try {
    const mod = import.meta.glob('../data/pagini-*.json', { eager: true });
    const key = Object.keys(mod).find(k => k.includes(`pagini-${serviciuSlug}.json`));
    if (key) {
      const data = (mod[key] as any).default || mod[key];
      paginiCache.set(serviciuSlug, data as Pagina[]);
      return data as Pagina[];
    }
  } catch {}
  return [];
}

// Load ALL pagini at once
let _allPagini: Pagina[] | null = null;
function getAllPaginiInternal(): Pagina[] {
  if (_allPagini) return _allPagini;
  const mod = import.meta.glob('../data/pagini-*.json', { eager: true });
  _allPagini = [];
  for (const [, val] of Object.entries(mod)) {
    const data = (val as any).default || val;
    _allPagini.push(...(data as Pagina[]));
  }
  return _allPagini;
}

export function getServiciuBySlug(slug: string) { return servicii.find(s => s.slug === slug); }
export function getOrasBySlug(slug: string) { return orase.find(o => o.slug === slug); }
export function getCategorieBySlug(slug: string) { return categorii.find(c => c.slug === slug); }
export function getServiciiByCategorie(catSlug: string) { return servicii.filter(s => categorii.find(c => c.slug === catSlug)?.servicii.includes(s.slug)); }
export function getPaginiForServiciu(slug: string) { return loadPagini(slug); }
export function getPaginiForServiciuOras(servSlug: string, orasSlug: string) { return loadPagini(servSlug).filter(p => p.orasSlug === orasSlug); }
export function getPaginaBySlug(servSlug: string, slug: string) { return loadPagini(servSlug).find(p => p.slug === slug); }
export function getAllPagini() { return getAllPaginiInternal(); }
export function getPaginiCount(servSlug: string) { return loadPagini(servSlug).length; }
export function getTopOrase() { return [...orase].sort((a, b) => b.populatie - a.populatie).slice(0, 35); }
