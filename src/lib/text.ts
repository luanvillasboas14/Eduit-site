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
