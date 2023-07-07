import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("data");

    const texts = await db.collection("texts").find().toArray();

    const transformedTexts = texts.map((text) => {
      const titles = text.titles.map((title: any) => title.title);
      return { titles };
    });

    res.json(transformedTexts);
  } catch (e) {
    console.error(e);
  }
};
