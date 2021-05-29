import { differenceInMinutes, startOfDay } from "date-fns";
import { ReactElement, useLayoutEffect, useRef, useState } from "react";
import { ParsedItem } from "./utils";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { ClickAwayListener, useMediaQuery } from "@material-ui/core";
import { toSpUrl } from "../../lib/rss";
import styled from "styled-components";

type Props = {
  item: ParsedItem;
};

export default function Cell({ item }: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const refa = useRef<string>();

  // 親要素の大きさを単位日として自分の大きさと位置を計算する
  useLayoutEffect(() => {
    const parentHeight = ref.current.parentElement.clientHeight;
    const minuteHeight = parentHeight / 24 / 60;
    const height =
      differenceInMinutes(item.content.end, item.content.start) * minuteHeight;

    const top =
      differenceInMinutes(item.content.start, startOfDay(item.content.start)) *
      minuteHeight;
    ref.current.style.height = height + "px";
    ref.current.style.top = top + "px";
  }, []);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <Container
        onClick={() => {
          setOpen((state) => !state);
        }}
        onMouseOver={() => {
          setMouseOver(true);
        }}
        onMouseLeave={() => {
          setMouseOver(false);
        }}
        ref={ref}
      >
        <IFrameTooltip open={mouseOver || open} link={item.link}>
          <Content>
            {item.title}:{item.content.start.toString()}~
            {item.content.end.toString()}
          </Content>
        </IFrameTooltip>
      </Container>
    </ClickAwayListener>
  );
}

const Container = styled.div`
  padding: 1px;
  position: absolute;
  width: 100%;
`;

const Content = styled.div`
  background-color: white;
  height: 100%;
  overflow: hidden;
  -webkit-line-clamp: 1;
`;

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 450,
    height: 300,
    padding: 0,
  },
}))(Tooltip);

type TooltipProps = {
  link: string;
  children: ReactElement;
  open: boolean;
};

function IFrameTooltip({ children, link, open }: TooltipProps) {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  return (
    <HtmlTooltip
      title={
        <iframe
          src={toSpUrl(link)}
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
      open={open}
      interactive
    >
      {children}
    </HtmlTooltip>
  );
}
