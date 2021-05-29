export function generateRssUrl(targetUrl: string): string {
  const rssUrl = new URL(targetUrl);
  if (!rssUrl.pathname.startsWith("/rss")) {
    rssUrl.pathname = "/rss" + rssUrl.pathname;
  }
  const url = new URL("./api/rss", window.location.origin);
  url.searchParams.append("url", rssUrl.toString());

  return url.toString();
}

export function toSpUrl(urlStr: string) {
  const url = new URL(urlStr);
  url.pathname = "/sp" + url.pathname;
  return url.toString();
}
