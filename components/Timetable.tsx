import { createRef, ReactNode, useEffect, useRef, useState } from "react";
import Head from "./Head/Head";
import Column from "./Timetable/Column";
import { Data, mapByCh } from "./Timetable/utils";
import SwipeableViews from "react-swipeable-views";
import { useMediaQuery } from "@material-ui/core";

type Props = { data: Data };
export default function Timetable({ data }: Props): JSX.Element {
  const map = mapByCh(data.items);
  const els = useRef(data.items.map(() => createRef<HTMLDivElement>()));
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  const [index, setIndex] = useState(0);
  return (
    <div>
      <SwipableFlex
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
                border: "1px solid",
                boxSizing: "border-box",
                flex: 1,
                minWidth: 100,
              }}
              bodyRef={els.current[i]}
            >
              {entity}
            </Head>
          );
        })}
      </SwipableFlex>
      <SwipableFlex
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
    </div>
  );
}

function SwipableFlex({
  children,
  index,
  onChangeIndex,
}: {
  children: ReactNode;
  index: number;
  onChangeIndex: (index: number, latestIndex: number) => void;
}) {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  if (matches) {
    return <div style={{ display: "flex" }}>{children}</div>;
  }
  return (
    <SwipeableViews index={index} onChangeIndex={onChangeIndex}>
      {children}
    </SwipeableViews>
  );
}
