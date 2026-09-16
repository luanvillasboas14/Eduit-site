import { Course, Polo } from '../types';
import { isPostgradCourse } from '../data/siteUrls';
import { foldText } from './text';

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function uniqueById(courses: Course[]): Course[] {
  const seen = new Set<string>();
  return courses.filter((course) => {
    if (seen.has(course.id)) return false;
    seen.add(course.id);
    return true;
  });
}

function titleTokens(title: string): string[] {
  return foldText(title)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 3);
}

export function pickRelatedCourses(course: Course, catalog: Course[], limit = 3): Course[] {
  const sameKind = isPostgradCourse(course);
  const tokens = titleTokens(course.title);
  const ranked = catalog
    .filter((item) => item.id !== course.id)
    .map((item) => {
      const sameType = isPostgradCourse(item) === sameKind;
      const sameCategory = item.category === course.category;
      const overlap = tokens.filter((token) => foldText(item.title).includes(token)).length;
      let score = 0;
      if (sameType) score += 50;
      if (sameCategory) score += 30;
      score += overlap * 8;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'pt-BR'));

  return uniqueById(ranked.map((entry) => entry.item)).slice(0, limit);
}

export function pickPoloCourses(polo: Polo, courses: Course[], limit: number): Course[] {
  const poloTokens = titleTokens(`${polo.name} ${polo.city} ${polo.neighborhood}`);
  const ranked = courses
    .map((course) => {
      const overlap = poloTokens.filter((token) =>
        foldText(`${course.title} ${course.category} ${course.description}`).includes(token),
      ).length;
      let score = 0;
      if (course.featured) score += 40;
      score += overlap * 12;
      score += hashString(`${polo.id}:${course.id}`) % 7;
      return { item: course, score };
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'pt-BR'));
  return uniqueById(ranked.map((entry) => entry.item)).slice(0, limit);
}

export function pickNearbyPolos(polo: Polo, polos: Polo[], limit = 6): Polo[] {
  const others = polos.filter((item) => item.id !== polo.id);
  const sameCity = others.filter((item) => item.city === polo.city);
  const rest = others
    .filter((item) => item.city !== polo.city)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  const seen = new Set<string>();
  return [...sameCity, ...rest].filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  }).slice(0, limit);
}
