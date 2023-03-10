import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

function feedbackHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req) throw new Error("didnt recieve req!");

    if (req.method === "POST") {
        const username = req.body.username;
        const password = req.body.password;

        const userInfo = { id: new Date().toISOString(), username, password };

        const filePath = path.join(process.cwd(), "data", "feedBack.json");
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData.toString());
        data.push(userInfo);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: "success!" });
    }
    res.status(200).json({ message: "This works" });
}

export default feedbackHandler;
