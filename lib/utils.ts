export function debounce<CB extends (...args: any[]) => void>(
  cb: CB,
  ms: number
) {
  let t: number = 0;
  return function (...args: Parameters<CB>) {
    clearTimeout(t);
    t = setTimeout(() => cb(...args), ms);
  };
}
