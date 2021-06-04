export function createPathnameWithQuery(url: string): string {
  return "/?url=" + encodeURIComponent(url);
}
