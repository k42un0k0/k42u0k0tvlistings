import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import Timetable from "../components/Timetable";
import styled from "styled-components";
import { Data } from "../components/Timetable/utils";
import { Header } from "../components/Header";
import { useUrlInQuery, useUrlInQueryEffect } from "../components/hooks";
import { generateRssUrl } from "../lib/rss";

export default function Home(): JSX.Element {
  const [urlInQuery] = useUrlInQuery();
  useUrlInQueryEffect();
  const { data, error } = useSWR(
    decodeURIComponent(urlInQuery as string),
    (url) => axios.get(generateRssUrl(url))
  );
  return (
    <Container>
      <Header />
      <Content error={error} data={data} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

type ContentProps = {
  error: any;
  data: AxiosResponse<Data>;
};

function Content({ error, data }: ContentProps): JSX.Element {
  if (error != null) {
    return <div>エラーが起きてるようです、検索窓を確認してください</div>;
  } else if (data == null) {
    return <div>Now Loading...</div>;
  } else {
    return <Timetable data={data.data} />;
  }
}
