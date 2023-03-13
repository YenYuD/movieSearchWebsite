import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import { MongoClient } from "mongodb";

export function buildFeedbackPath() {
    return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath: any) {
    const fileData = fs.readFileSync(filePath).toString();
    const data = JSON.parse(fileData);
    return data;
}

async function feedbackHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req) throw new Error("didnt recieve req!");

    if (req.method === "POST") {
        const comment = req.body.comment;
        const rateValue = req.body.rateValue;

        const randomID = Math.floor(Math.random() * 1000);

        const rateInfo = { id: randomID, comment, rateValue };

        const client = await MongoClient.connect(
            `mongodb+srv://YenyuDiao:${process.env.MONGO_DB_PASSWORD}@cluster0.xwkdcly.mongodb.net/?retryWrites=true&w=majority`
        );
        const db = client.db();
        //collection('table name')
        await db.collection("comments").insertOne(rateInfo);

        client.close(); //disconnect connection

        res.status(201).json({ message: "success!" });
    }
    res.status(200).json({ message: "This works" });
}

export default feedbackHandler;
