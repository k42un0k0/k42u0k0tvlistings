import { useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useIsSp } from "../lib/utils";
import { generatePathnameWithQuery, useUrlInQuery } from "./hooks";
import Input from "./Input";

const sample =
  "https://www.tvkingdom.jp/schedulesBySearch.action?condition.genres%5B0%5D.parentId=107000&condition.genres%5B0%5D.childId=107100&stationPlatformId=1&condition.keyword=&submit=%E6%A4%9C%E7%B4%A2&index=240";

export function Header() {
  const [urlInQuery, setUrlInQuery] = useUrlInQuery();
  const isSp = useIsSp();
  return (
    <Container>
      <Title>番組表</Title>
      <Grow>
        <Input
          value={urlInQuery as string}
          onChange={(e) => {
            setUrlInQuery(e.target.value);
          }}
        />
        <Note matches={isSp}>
          <Astarisk>
            ※
            <StyledLink as="a" href={sample}>
              テレビ王国
            </StyledLink>
            で検索した結果のURLを入力してください。
          </Astarisk>
          <div>
            <StyledLink as="a" href={generatePathnameWithQuery(sample)}>
              サンプル
            </StyledLink>
          </div>
        </Note>
      </Grow>
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  white-space: nowrap;
  margin-right: 1em;
`;

const Astarisk = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Grow = styled.div`
  flex: 1;
`;

const Note = styled.div<{ matches: boolean }>`
  bottom: 4px;
  display: flex;
  alignitems: flex-start;
  ${({ matches }) =>
    matches
      ? `
      position: absolute;
    `
      : `
      position: relative;
      padding-top: 20px;
      flex-direction: column;
    `}
`;

const StyledLink = styled(Link)`
  color: blue;
`;
