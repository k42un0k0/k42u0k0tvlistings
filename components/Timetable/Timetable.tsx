import styled from "styled-components";
import { useEffect, useRef } from "react";

type Props = {};

export default function Timetable(props: Props): JSX.Element {
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
      <Pad>a</Pad>
      <DateList>a</DateList>
      <Header>a</Header>
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
`;
const DateListItem = styled.li``;
const Content = styled.div`
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  background: linear-gradient(-45deg, black, white);
  height: 2000px;
  width: 2000px;
`;
