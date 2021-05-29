import { useRouter } from "next/router";
import { createRef, MutableRefObject, useEffect, useRef } from "react";

export function generatePathnameWithQuery(url: string): string {
  return "/?url=" + encodeURIComponent(url);
}
export function useUrlInQuery(): [string | string[], (url: string) => void] {
  const router = useRouter();
  let urlInQuery = router.query["url"] || "";
  function setUrlInQuery(url: string) {
    router.push(generatePathnameWithQuery(url));
  }

  return [urlInQuery, setUrlInQuery];
}

export function useUrlInQueryEffect(): void {
  const [urlInQuery, setUrlInQuery] = useUrlInQuery();
  useEffect(() => {
    if (typeof urlInQuery != "string") {
      setUrlInQuery("");
    }
  }, [urlInQuery]);
}

export function useRefList<T>(
  length: number
): MutableRefObject<MutableRefObject<T>[]> {
  const ref = useRef<MutableRefObject<T>[]>(
    [...Array(length).fill(null)].map(() => createRef<T>())
  );
  return ref;
}
