import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import useSWR from "swr";
import Timetable from "../components/Timetable";

function generateRssUrl(targetUrl: string): string {
  const url = new URL("./api/rss", window.location.origin);
  url.searchParams.append("url", targetUrl);

  return url.toString();
}

const defaultTarget =
  "https://www.tvkingdom.jp/rss/schedulesBySearch.action?condition.genres%5B0%5D.parentId=107000&condition.genres%5B0%5D.childId=107100&stationPlatformId=1&condition.keyword=&submit=%E6%A4%9C%E7%B4%A2&index=240";

export default function Home(): JSX.Element {
  const [target, setTarget] = useState(defaultTarget);
  const { data, error } = useSWR(target, (url) =>
    axios.get(generateRssUrl(url))
  );
  if (error != null) {
    return <div>何かしらのエラー</div>;
  }
  return (
    <div>
      <Input
        value={target}
        onChange={(e) => {
          setTarget(e.target.value);
        }}
      />
      {data == null || <Timetable data={data.data} />}
    </div>
  );
}
