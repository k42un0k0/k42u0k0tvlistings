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
      <Header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "green",
          display: "flex",
        }}
      ></Header>
      <div style={{ height: 2000, backgroundColor: "blue" }}></div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
`;
