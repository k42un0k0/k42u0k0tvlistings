import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";
import http from "http";
const parser = new Parser({
  customFields: {},
});

export default async function rss(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query["url"];
  if (typeof url == "string") {
    try {
      const feed = await parser.parseURL(url);
      console.log(feed.title); // feed will have a `foo` property, type as a string

      feed.items.forEach((item) => {
        console.log(item.title + ":" + item.link); // item will have a `bar` property type as a number
      });
      res.status(200).json(feed);
    } catch (e) {
      console.log(e);
      // @ts-ignore
      if (e.code === "ENOTFOUND") {
        console.log("not found");
        res.status(404).json({ code: 404 });
      } else {
        res.status(500).json(e);
      }
    }
  } else {
    res.status(400).json({ code: 400 });
  }
}
