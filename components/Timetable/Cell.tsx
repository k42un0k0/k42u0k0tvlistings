import { differenceInHours, differenceInMinutes, startOfDay } from "date-fns";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { ParsedItem } from "./utils";

type Props = {
  item: ParsedItem;
};
export default function Cell({ item }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      const parentHeight = ref.current.parentElement.clientHeight;
      const minuteHeight = parentHeight / 24 / 60;
      const height =
        differenceInMinutes(item.content.end, item.content.start) *
        minuteHeight;

      const top =
        differenceInMinutes(
          item.content.start,
          startOfDay(item.content.start)
        ) * minuteHeight;
      ref.current.style.height = height + "px";
      ref.current.style.top = top + "px";
    });
  }, []);
  return (
    <div style={{ padding: 1, position: "absolute", width: "100%" }} ref={ref}>
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          overflow: "hidden",
          WebkitLineClamp: 1,
        }}
      >
        {item.title}:{item.content.start.toString()}~
        {item.content.end.toString()}
      </div>
    </div>
  );
}
