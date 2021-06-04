import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import styled from "styled-components";
import { Data } from "../components/Timetable/utils";
import { Header } from "../components/Header";
import {
  useIsSp,
  useUrlInQuery,
  useUrlInQueryEffect,
} from "../components/hooks";
import { generateRssUrl } from "../lib/rss";
import { Timetable, TimetableSp } from "../components/Timetable";

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
      <Content error={error} data={data} urlInQuery={urlInQuery as string} />
    </Container>
  );
}

const Container = styled.div``;
type ContentProps = {
  error: any;
  data: AxiosResponse<Data>;
  urlInQuery: string;
};

function Content({ error, data, urlInQuery }: ContentProps): JSX.Element {
  const isSp = useIsSp();
  if (error != null) {
    return <div>エラーが起きてるようです、検索欄を確認してください</div>;
  } else if (urlInQuery === "") {
    return <div></div>;
  } else if (data == null) {
    return <div>Now Loading...</div>;
  } else {
    return isSp ? (
      <Timetable data={data.data}></Timetable>
    ) : (
      <TimetableSp data={data.data} />
    );
  }
}
