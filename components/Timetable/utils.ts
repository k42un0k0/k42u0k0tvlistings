import {
  setMinutes,
  setHours,
  addDays,
  compareDesc,
  differenceInCalendarDays,
  startOfDay,
} from "date-fns";
import { MutableRefObject, RefObject, Ref, useEffect, useRef } from "react";

export function useScrollControllable<E extends HTMLElement>(
  containerRef: MutableRefObject<E>
) {
  useEffect(() => {
    const onScroll = () => {
      if (containerRef.current.getBoundingClientRect().y < 0) {
        containerRef.current.style.overflowY = "scroll";
      } else {
        containerRef.current.style.overflowY = "hidden";
      }
    };
    window.addEventListener("scroll", onScroll);
    containerRef.current.addEventListener("scroll", () => {
      if (containerRef.current.scrollTop === 0) {
        document.body.style.overflowY = "auto";
      } else {
        document.body.style.overflowY = "hidden";
      }
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
}
export function mapByCh(items: Item[]): [Map<string, ParsedItem[]>, Date[]] {
  const map = new Map<string, ParsedItem[]>();
  let prevDate = startOfDay(new Date());
  let dateArr: Date[] = [prevDate];
  items.forEach((item) => {
    const parsedItem = parseItem(item);
    const arr = map.get(parsedItem.content.ch) || [];
    if (differenceInCalendarDays(prevDate, parsedItem.content.start)) {
      dateArr = dateArr.concat(
        startOfDay((prevDate = parsedItem.content.start))
      );
    }
    map.set(parsedItem.content.ch, arr.concat(parsedItem));
  });
  const sortedMap = new Map(
    [...map.entries()].sort(([a], [b]) => {
      const ach = parseInt(a.match(/\(Ch.(\d*)\)/)?.[1]) || a;
      const bch = parseInt(b.match(/\(Ch.(\d*)\)/)?.[1]) || b;
      if (ach > bch || typeof ach == "string") return 1;
      if (ach < bch || typeof bch == "string") return -1;
      return 0;
    })
  );
  return [sortedMap, dateArr];
}

export type ParsedItem = {
  content: Content;
  date: string;
  title: string;
  link: string;
  "dc:date": string;
  contentSnippet: string;
  isoDate: Date;
};
function parseItem(item: Item): ParsedItem {
  return {
    ...item,
    content: parseContent(item.content, item.date),
  };
}

type Content = {
  start: Date;
  end: Date;
  ch: string;
};
/**
 * contentを扱いやすい形にparseする
 * @module hello
 * @param {string} content - パースする対象
 * example:
 * - 5/30 2:00～2:30 [テレビ朝日(Ch.5)]
 * - 5/30 22:30～23:00 [ＴＯＫＹＯ　ＭＸ１(Ch.9)]
 * @param {string} baseDate - ベースとする日付
 * @return {Content}
 */
function parseContent(content: string, baseDate: string): Content {
  const match = content.match(/(.*)\[(.*)\]/);
  const datetime = match[1].split(" ");
  const ch = match[2];
  const date = new Date(baseDate);
  const time = datetime[1].split("～");
  const startTime = time[0].split(":");
  const endTime = time[1].split(":");
  const start = setMinutes(
    setHours(date, parseInt(startTime[0])),
    parseInt(startTime[1])
  );
  let end = setMinutes(
    setHours(date, parseInt(endTime[0])),
    parseInt(endTime[1])
  );
  if (compareDesc(start, end) === -1) {
    end = addDays(end, 1);
  }
  return {
    start,
    end,
    ch,
  };
}
export type Item = {
  date: string;
  title: string;
  link: string;
  "dc:date": string;
  content: string;
  contentSnippet: string;
  isoDate: Date;
};

export type Data = {
  items: Item[];
  publisher: string;
  creator: string;
  title: string;
  description: string;
  link: string;
};
