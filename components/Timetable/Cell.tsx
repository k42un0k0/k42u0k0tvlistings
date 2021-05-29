import { differenceInMinutes, startOfDay } from "date-fns";
import { useLayoutEffect, useRef, useState } from "react";
import { ParsedItem } from "./utils";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { ClickAwayListener, useMediaQuery } from "@material-ui/core";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 450,
    height: 300,
    padding: 0,
  },
}))(Tooltip);
type Props = {
  item: ParsedItem;
};
export default function Cell({ item }: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
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
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <div
        onClick={() => {
          setOpen((state) => !state);
        }}
        onMouseOver={() => {
          setMouseOver(true);
        }}
        onMouseLeave={() => {
          setMouseOver(false);
        }}
        style={{ padding: 1, position: "absolute", width: "100%" }}
        ref={ref}
      >
        <HtmlTooltip
          title={
            <iframe
              src={toSp(item.link)}
              style={{
                ...(matches
                  ? { width: 450, height: 300 }
                  : { width: 300, height: 300 }),
                zIndex: 10,
                border: "none",
              }}
            />
          }
          placement="bottom"
          open={mouseOver || open}
          interactive
        >
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
        </HtmlTooltip>
      </div>
    </ClickAwayListener>
  );
}

function toSp(urlStr: string) {
  const url = new URL(urlStr);
  url.pathname = "/sp" + url.pathname;
  return url.toString();
}
