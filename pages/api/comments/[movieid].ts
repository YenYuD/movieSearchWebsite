import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
} from "../../../helpers/db-util";

interface Comment {
    _id?: ObjectId;
    username: string;
    comment: string;
    movieID: string | string[] | undefined;
    rateValue: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const movieID = req.query.movieid;

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    if (req.method === "POST") {
        const { username, comment, rateValue } = req.body;

        if (!username || !rateValue) {
            res.status(422).json({ message: "Invalid input." });
            client.close();
            return;
        }

        const newComment: Comment = {
            username,
            comment,
            movieID,
            rateValue,
        };

        let result;

        try {
            result = await insertDocument(client, "comments", newComment);
            newComment._id = result.insertedId;
            res.status(201).json({
                message: "Added comment.",
                comment: newComment,
            });
        } catch (error) {
            res.status(500).json({ message: "Inserting comment failed!" });
        }
    }

    if (req.method === "GET") {
        const db = client.db();

        try {
            const documents = await getAllDocuments(
                client,
                "comments",
                { _id: -1 },
                { movieID: movieID }
            );
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: "Getting comments failed." });
        }
    }

    client.close();
}

export default handler;
