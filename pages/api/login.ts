import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDocument } from "../../helpers/db-util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    if (req.method !== "POST") {
        res.status(500).json({ message: "invalid method" });
        return;
    }

    if (req.method === "POST") {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(422).json({ message: "invalid username or password." });
            client.close();
            return;
        }

        const db = client.db();

        const document = await db.collection("userTable").findOne({ username });

        if (!document?._id) {
            res.status(401).json({ message: "user not found." });
        }

        const isMatch = await bcrypt.compare(password, document?.password);

        if (!isMatch) {
            res.status(402).json({ message: "invalid username or password" });
        }

        const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET!, {
            expiresIn: "2h",
        });
    }
}
