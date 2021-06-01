import styled from "styled-components";
import { useEffect, useRef } from "react";
import { Data, mapByCh } from "./utils";

type Props = {
  data: Data;
};

export default function Timetable({ data }: Props): JSX.Element {
  const [map, dateArr] = mapByCh(data.items);
  const containerRef = useRef<HTMLDivElement>();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (containerRef.current.getBoundingClientRect().y < 0) {
        containerRef.current.style.overflowY = "scroll";
      } else {
        containerRef.current.style.overflowY = "hidden";
      }
    });
  });
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
      <Header>
        {[...map.keys()].map((key) => {
          return <Head key={key}>{key}</Head>;
        })}
      </Header>
      <Content>a</Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-x: scroll;

  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  background-color: #333;
  display: flex;
  color: white;
`;

const Head = styled.div`
  flex: 1 1 auto;
`;

const Pad = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
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
`;
const DateListItem = styled.li`
  border-top: 1px solid #ccc;
`;
const Content = styled.div`
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  background: linear-gradient(-45deg, black, white);
  height: 2000px;
  width: 2000px;
`;
