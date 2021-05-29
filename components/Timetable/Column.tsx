import { differenceInCalendarDays } from "date-fns";
import { forwardRef } from "react";
import { generateBackGround } from "../../lib/utils";
import Cell from "./Cell";
import { ParsedItem } from "./utils";

type Props = {
  indexmod12: number;
  entity: [string, ParsedItem[]];
};
export default forwardRef<HTMLDivElement, Props>(function Column(
  { indexmod12, entity }: Props,
  ref
): JSX.Element {
  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        position: "relative",
        height: "100%",
        background: generateBackGround(indexmod12),
      }}
    >
      {[...filterByDay(entity[1], new Date(Date.now()))]}
    </div>
  );
});

function* filterByDay(items: ParsedItem[], date: Date) {
  for (let item of items) {
    if (differenceInCalendarDays(date, item.content.start) > 0) {
      continue;
    } else if (differenceInCalendarDays(date, item.content.start) < 0) {
      return null;
    } else {
      yield <Cell key={item.title + item.date} item={item} />;
    }
  }
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
