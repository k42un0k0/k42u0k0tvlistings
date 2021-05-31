import { ReactNode, useState } from "react";
import Head from "./Head/Head";
import Column from "./Timetable/Column";
import { Data, mapByCh } from "./Timetable/utils";
import SwipeableViews from "react-swipeable-views";
import { useMediaQuery } from "@material-ui/core";
import { generateBackGround } from "../lib/utils";
import { useRefList } from "./hooks";
import styled from "styled-components";
import { differenceInCalendarDays, startOfDay, format } from "date-fns";

type Props = { data: Data };
export default function Timetable({ data }: Props): JSX.Element {
  const [map, dateArr] = mapByCh(data.items);
  const [date, setDate] = useState(() => startOfDay(new Date()));
  const els = useRefList<HTMLDivElement>(data.items.length);
  const [index, setIndex] = useState(0);
  return (
    <Container>
      <DateList>
        {dateArr.map((d) => {
          return (
            <DateItem
              key={d.toString()}
              selected={differenceInCalendarDays(d, date) == 0}
              onClick={() => {
                setDate(d);
              }}
            >
              {format(d, "M/d")}
            </DateItem>
          );
        })}
      </DateList>
      <div
        style={{
          gridRow: "2 / span 1",
          gridColumn: "1 / span 1",
          background: generateBackGround(1),
        }}
      ></div>
      <div
        style={{
          display: "flex",
          gridRow: "3 / span 1",
          gridColumn: "1 / span 1",
          flexDirection: "column",
          justifyContent: "space-between",
          background: generateBackGround(1),
        }}
      >
        {[...Array(25).fill(null).keys()].map((i) => {
          if (i == 24) {
            return <div></div>;
          }
          return (
            <div key={i} style={{ borderTop: "1px solid #999" }}>
              {i.toString().padStart(2, "0")}:00
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          gridRow: "2 / span 1",
          gridColumn: "2 / span 1",
        }}
        // index={index}
        // onChangeIndex={(index) => {
        //   setIndex(index);
        // }}
      >
        {[...map.keys()].map((entity, i) => {
          return (
            <Head
              key={entity}
              style={{
                boxSizing: "border-box",
                flex: 1,
                padding: "1em",
                background: generateBackGround(i % 12),
              }}
              bodyRef={els.current[i]}
            >
              {entity}
            </Head>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          gridRow: "3 / span 1",
          gridColumn: "2 / span 1",
        }}
        // index={index}
        // onChangeIndex={(index) => {
        //   setIndex(index);
        // }}
      >
        {[...map.entries()].map((entity, i) => {
          return (
            <Column
              key={entity[0]}
              date={date}
              ref={els.current[i]}
              entity={entity}
              indexmod12={i % 12}
            />
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
`;

const DateList = styled.ul`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
`;

const DateItem = styled.li<{ selected: boolean }>`
  padding: 10px;
  cursor: pointer;
  ${({ selected }) => (selected ? `color: blue` : ``)}
`;

function div({
  children,
  index,
  onChangeIndex,
  style,
}: {
  children: ReactNode;
  index: number;
  onChangeIndex: (index: number, latestIndex: number) => void;
  style: any;
}) {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  if (matches) {
    return <div style={style}>{children}</div>;
  }
  return (
    <SwipeableViews
      containerStyle={{ height: "100%" }}
      index={index}
      onChangeIndex={onChangeIndex}
    >
      {children}
    </SwipeableViews>
  );
}
