import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const userEmail = req.body.userEmail;
        if (!userEmail || !userEmail.includes("@")) {
            return res.status(422).json({ message: "invalid email address" });
        }
    }
    return res.status(200).json({ message: "suscribe successfully!" });
}

export default handler;
