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
      res.status(200).json(feed);
    } catch (e) {
      // @ts-ignore
      if (e.code === "ENOTFOUND") {
        res.status(404).json({ code: 404 });
      } else {
        res.status(500).json(e);
      }
    }
  } else {
    res.status(400).json({ code: 400 });
  }
}
