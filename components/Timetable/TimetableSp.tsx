import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Data, mapByCh, useScrollControllable } from "./utils";
import Cell from "./Cell";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import SwipeableViews from "react-swipeable-views";
type Props = {
  data: Data;
};

let scrollpercentage = 0;
export default function Timetable({ data }: Props): JSX.Element {
  const [map, dateArr] = mapByCh(data.items);
  const [date, setDate] = useState(() => startOfDay(new Date()));
  const [height, setHeight] = useState(1000);
  const ref = useRef<any>();
  const headerRef = useRef<HTMLDivElement>();
  useEffect(() => {
    Object.defineProperty(ref.current.rootNode.children[0].style, "transform", {
      set: function (transform) {
        headerRef.current.style.transform = transform;
      },
    });
    Object.defineProperty(
      ref.current.rootNode.children[0].style,
      "transition",
      {
        set: function (transition) {
          headerRef.current.style.transition = transition;
        },
      }
    );
  }, []);
  return (
    <Container>
      <Pad />
      <DateList>
        {[...Array(25).fill(null).keys()].map((i) => {
          if (i == 24) {
            return <div key={i} />;
          }
          return (
            <DateListItem key={i}>
              {i.toString().padStart(2, "0")}:00
            </DateListItem>
          );
        })}
      </DateList>
      <Header>
        <div ref={headerRef} style={{ display: "flex" }}>
          {[...map.keys()].map((key) => {
            return <Head key={key}>{key}</Head>;
          })}
        </div>
      </Header>
      <SwipeableViews style={{ width: "100%" }} ref={ref}>
        {[...map.entries()].map(([key, items]) => {
          return (
            <Content key={key}>
              <Column style={{ height }}>
                {items
                  .filter((item) => {
                    if (
                      differenceInCalendarDays(date, item.content.end) > 0 ||
                      differenceInCalendarDays(date, item.content.start) < 0
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((item) => {
                    return (
                      <Cell
                        key={item.title + item.date}
                        item={item}
                        height={height}
                      />
                    );
                  })}
              </Column>
            </Content>
          );
        })}
      </SwipeableViews>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
`;
const Pad = styled.div`
  grid-area: 1 / 1 / span 1 / span 1;
  background-color: #666;
`;
const Header = styled.header`
  overflow: hidden;
  background-color: #333;
  color: white;
`;
const Head = styled.div`
  width: 100%;
  flex: 0 0 auto;
`;

const DateList = styled.ul`
  grid-area: 2/1/3/2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #999;
`;
const DateListItem = styled.li`
  border-top: 1px solid #ccc;
`;

const Content = styled.div`
  background: linear-gradient(-45deg, black, white);
`;

const Column = styled.div``;
