import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("data");

    const images = await db
      .collection("images")
      .find({})
      .toArray();

    res.json(images);
  } catch (e) {
    console.error(e);
  }
};