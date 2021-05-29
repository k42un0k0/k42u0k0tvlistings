import { createRef, useEffect, useRef } from "react";
import Head from "./Head/Head";
import Column from "./Timetable/Column";
import { Data, mapByCh } from "./Timetable/utils";

type Props = { data: Data };
export default function Timetable({ data }: Props): JSX.Element {
  const map = mapByCh(data.items);
  const els = useRef(data.items.map(() => createRef<HTMLDivElement>()));

  return (
    <div>
      <div style={{ display: "flex" }}>
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
      </div>
      <div style={{ display: "flex" }}>
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
      </div>
    </div>
  );
}
