import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Data, mapByCh, useScrollControllable } from "./utils";
import Cell from "./Cell";
import { differenceInCalendarDays, startOfDay } from "date-fns";

type Props = {
  data: Data;
};

let scrollpercentage = 0;
export default function Timetable({ data }: Props): JSX.Element {
  const [map, dateArr] = mapByCh(data.items);
  const [date, setDate] = useState(() => startOfDay(new Date()));
  const [height, setHeight] = useState(2000);
  const containerRef = useRef<HTMLDivElement>();
  useScrollControllable(containerRef);
  const contentRef = useRef<HTMLDivElement>();
  const timeListRef = useRef<HTMLUListElement>();
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey && containerRef.current) {
        e.preventDefault();
        scrollpercentage =
          containerRef.current.scrollTop / containerRef.current.scrollHeight;
        setHeight((state) => {
          const newState = state * (e.deltaY > 0 ? 1.02 : 1 / 1.02);
          const min = window.innerHeight - timeListRef.current.offsetHeight;
          if (newState < min) {
            return min;
          }
          return newState;
        });
      }
    };
    contentRef.current.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      contentRef.current?.removeEventListener("wheel", onWheel);
    };
  }, []);
  useEffect(() => {
    contentRef.current.style.height = height + "px";
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight * scrollpercentage,
    });
  }, [height]);
  return (
    <Container ref={containerRef}>
      <Pad></Pad>
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
      <Header ref={timeListRef}>
        {[...map.keys()].map((key) => {
          return <Head key={key}>{key}</Head>;
        })}
      </Header>
      <Content ref={contentRef}>
        {[...map.entries()].map(([key, items]) => {
          return (
            <Column key={key}>
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
          );
        })}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  background-color: #333;
  color: white;
  z-index: 1;
  white-space: nowrap;
`;

const Head = styled.div`
  display: inline-block;
  width: 200px;
`;

const Pad = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  background-color: #666;
`;
const DateList = styled.ul`
  position: sticky;
  left: 0;
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
  background-color: #999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;
const DateListItem = styled.li`
  border-top: 1px solid #ccc;
  height: 0;
`;
const Content = styled.div`
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  background: linear-gradient(-45deg, black, white);
`;

const Column = styled.div`
  border-right: 1px solid #333;
  position: relative;
  display: inline-block;
  width: 200px;
  height: 100%;
`;
