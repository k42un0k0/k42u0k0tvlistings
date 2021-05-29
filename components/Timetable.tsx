import { MutableRefObject, ReactNode, useState } from "react";
import Head from "./Head/Head";
import Column from "./Timetable/Column";
import { Data, mapByCh } from "./Timetable/utils";
import SwipeableViews from "react-swipeable-views";
import { useMediaQuery } from "@material-ui/core";
import { generateBackGround } from "../lib/utils";
import { useRefList } from "./hooks";
import styled from "styled-components";

type Props = { data: Data };
export default function Timetable({ data }: Props): JSX.Element {
  const map = mapByCh(data.items);
  const els = useRefList<HTMLDivElement>(data.items.length);
  const [index, setIndex] = useState(0);
  return (
    <Container>
      <div
        style={{
          gridRow: "1 / 2",
          gridColumn: "1 / 2",
          background: generateBackGround(1),
        }}
      ></div>
      <div
        style={{
          display: "flex",
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
          background: generateBackGround(1),
        }}
      >
        <div>0:00</div>
        <div>24:00</div>
      </div>
      <SwipableFlex
        style={{
          display: "flex",
          gridRow: "1 / 2",
          gridColumn: "2 / 3",
        }}
        index={index}
        onChangeIndex={(index) => {
          setIndex(index);
        }}
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
      </SwipableFlex>
      <SwipableFlex
        style={{
          display: "flex",
          gridRow: "2 / 3",
          gridColumn: "2 / 3",
        }}
        index={index}
        onChangeIndex={(index) => {
          setIndex(index);
        }}
      >
        {[...map.entries()].map((entity, i) => {
          return (
            <Column
              key={entity[0]}
              ref={els.current[i]}
              entity={entity}
              indexmod12={i % 12}
            />
          );
        })}
      </SwipableFlex>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: grid;
  flex-direction: column;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
`;

function SwipableFlex({
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
