import { differenceInCalendarDays } from "date-fns";
import { forwardRef } from "react";
import styled from "styled-components";
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
    <Container indexmod12={indexmod12} ref={ref}>
      {[...filterByDay(entity[1], new Date(Date.now()))]}
    </Container>
  );
});

const Container = styled.div<{ indexmod12: number }>`
  flex-shrink: 0;
  position: relative;
  height: 100%;
  overflow: hidden;
  background: ${({ indexmod12 }) => generateBackGround(indexmod12)};
`;

function* filterByDay(items: ParsedItem[], date: Date) {
  for (let item of items) {
    if (differenceInCalendarDays(date, item.content.start) > 0) {
      continue;
    } else if (differenceInCalendarDays(date, item.content.start) < 0) {
      return;
    } else {
      yield <Cell key={item.title + item.date} item={item} />;
    }
  }
}
