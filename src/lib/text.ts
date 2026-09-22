export function foldText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function textMatches(haystack: string | undefined, needle: string): boolean {
  if (!needle.trim()) return true;
  return foldText(haystack || '').includes(foldText(needle));
}

export function matchesAny(needle: string, values: Array<string | undefined>): boolean {
  return values.some((value) => textMatches(value, needle));
}

type SearchableCourse = {
  title: string;
  category?: string;
  description?: string;
  modality?: string;
  modules?: string[];
};

/** Título pesa mais que categoria e descrição, para a busca não enterrar o curso certo. */
export function courseSearchScore(query: string, course: SearchableCourse): number {
  const q = foldText(query);
  if (!q) return 1;

  const title = foldText(course.title || '');
  const category = foldText(course.category || '');
  const modality = foldText(course.modality || '');
  const extras = [course.description, ...(course.modules || [])].map((value) => foldText(value || ''));

  let score = 0;
  if (title === q) score += 100;
  else if (title.startsWith(`${q} `) || title.startsWith(q)) score += 80;
  else if (title.includes(q)) score += 60;
  if (category.includes(q)) score += 20;
  if (modality.includes(q)) score += 10;
  if (extras.some((value) => value.includes(q))) score += 5;
  return score;
}

export function compareCoursesBySearch<T extends SearchableCourse>(query: string) {
  return (a: T, b: T) =>
    courseSearchScore(query, b) - courseSearchScore(query, a) ||
    a.title.localeCompare(b.title, 'pt-BR');
}
