import { NextApiRequest, NextApiResponse } from "next";
import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
} from "../../../helpers/db-util";
import { hash } from "bcryptjs";

async function hashPassword(password: string) {
    const hashPassword = await hash(password, 12);
    return hashPassword;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    const { email, password } = req.body;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (
        !email ||
        !password ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password.trim())
    ) {
        res.status(422).json({ message: "invalid email or password" });
    }

    const db = client.db();

    if (req.method === "POST") {
        const exsitingUser = await db
            .collection("userTable")
            .findOne({ email: email });

        if (exsitingUser) {
            res.status(422).json({
                message: "user already exsist.",
                success: false,
            });
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection("userTable").insertOne({
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "user created!", success: true });
    } else {
        return res.status(402).json({ message: "wrong method" });
    }
}

export default handler;
