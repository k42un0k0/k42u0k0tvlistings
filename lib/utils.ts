export function debounce<CB extends (...args: any[]) => void>(
  cb: CB,
  ms: number
) {
  let t: number = 0;
  return function (...args: Parameters<CB>) {
    clearTimeout(t);
    // @ts-ignore
    t = setTimeout(() => cb(...args), ms);
  };
}

export function generateBackGround(indexmod12: number) {
  return `linear-gradient(${colors[indexmod12].start}, ${colors[indexmod12].end})`;
}

const colors = [
  { end: "#ff8e8e", start: "#ffe5e5" },
  { end: "#ff8ec6", start: "#ffe5f2" },
  { end: "#ff8eff", start: "#ffe5ff" },
  { end: "#c68eff", start: "#f2e5ff" },
  { end: "#8e8eff", start: "#e5e5ff" },
  { end: "#8ec6ff", start: "#e5f2ff" },
  { end: "#8effff", start: "#e5ffff" },
  { end: "#8effc6", start: "#e5fff2" },
  { end: "#8eff8e", start: "#e5ffe5" },
  { end: "#c6ff8e", start: "#f2ffe5" },
  { end: "#ffff8e", start: "#ffffe5" },
  { end: "#ffc68e", start: "#fff2e5" },
];
