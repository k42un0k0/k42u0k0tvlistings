import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import { createRef, MutableRefObject, useEffect, useRef } from "react";
import { createPathnameWithQuery } from "../lib/path";

export function useUrlInQuery(): [string | string[], (url: string) => void] {
  const router = useRouter();
  let urlInQuery = router.query["url"] || "";
  function setUrlInQuery(url: string) {
    router.push(createPathnameWithQuery(url));
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
    Array(length)
      .fill(null)
      .map(() => createRef<T>())
  );
  return ref;
}

export function useIsSp(): boolean {
  return useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
}
