import { setMinutes, setHours, addDays, compareDesc, parse } from "date-fns";

type Props = { data: Data };
export default function Timetable({ data }: Props): JSX.Element {
  const map = mapByCh(data.items);
  return (
    <div style={{ display: "flex" }}>
      {Array.from(map.entries()).map(([ch, items]) => {
        return (
          <div key={ch}>
            <h2>{ch}</h2>
            {items.map((item) => {
              return <div key={item.content.ch + item.date}>{item.title}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

function mapByCh(items: Item[]): Map<string, ParsedItem[]> {
  const map = new Map<sttring, ParsedItem[]>();
  items.forEach((item) => {
    const parsedItem = parseItem(item);
    const arr = map.get(parsedItem.content.ch) || [];
    map.set(parsedItem.content.ch, arr.concat(parsedItem));
  });
  return map;
}

type ParsedItem = {
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
type Item = {
  date: string;
  title: string;
  link: string;
  "dc:date": string;
  content: string;
  contentSnippet: string;
  isoDate: Date;
};

type Data = {
  items: Item[];
  publisher: string;
  creator: string;
  title: string;
  description: string;
  link: string;
};
