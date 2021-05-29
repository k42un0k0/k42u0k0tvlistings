import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import useSWR from "swr";
import Timetable from "../components/Timetable";
import rss from "./api/rss";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import { useMediaQuery } from "@material-ui/core";

function generateRssUrl(targetUrl: string): string {
  const rssUrl = new URL(targetUrl);
  if (!rssUrl.pathname.startsWith("/rss")) {
    rssUrl.pathname = "/rss" + rssUrl.pathname;
  }
  const url = new URL("./api/rss", window.location.origin);
  url.searchParams.append("url", rssUrl.toString());

  return url.toString();
}

const defaultTarget =
  "https://www.tvkingdom.jp/schedulesBySearch.action?condition.genres%5B0%5D.parentId=107000&condition.genres%5B0%5D.childId=107100&stationPlatformId=1&condition.keyword=&submit=%E6%A4%9C%E7%B4%A2&index=240";

export default function Home(): JSX.Element {
  const router = useRouter();
  let target = router.query["url"] || "";
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  useEffect(() => {
    if (typeof target != "string") {
      router.push("/?url=");
    }
  }, [target]);
  const { data, error } = useSWR(decodeURIComponent(target as string), (url) =>
    axios.get(generateRssUrl(url))
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <header
        style={{
          padding: "1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <h2 style={{ whiteSpace: "nowrap", marginRight: "1em" }}>番組表</h2>
        <div style={{ flex: 1 }}>
          <Input
            value={target as string}
            onChange={(e) => {
              router.push("/?url=" + encodeURIComponent(e.target.value));
            }}
          />
          <div
            style={{
              bottom: 4,
              display: "flex",
              alignItems: "flex-start",
              ...(matches
                ? {
                    position: "absolute",
                  }
                : {
                    position: "relative",
                    paddingTop: 20,
                    flexDirection: "column",
                  }),
            }}
          >
            <div>
              ※
              <a
                href="https://www.tvkingdom.jp/schedulesBySearch.action"
                style={{ color: "blue" }}
              >
                テレビ王国
              </a>
              で検索した結果のURLを入力してください。
            </div>
            <div>
              <a
                href={"/?url=" + encodeURIComponent(defaultTarget)}
                style={{ color: "blue" }}
              >
                サンプル
              </a>
            </div>
          </div>
        </div>
      </header>
      {error != null ? (
        <div>エラーが起きてるようです、検索窓を確認してください</div>
      ) : data == null ? (
        ""
      ) : (
        <Timetable data={data.data} />
      )}
    </div>
  );
}
