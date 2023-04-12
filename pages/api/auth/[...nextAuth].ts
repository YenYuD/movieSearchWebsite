import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectDatabase } from "../../../helpers/db-util";

export default NextAuth({
    providers: [
        Providers.Credentials({
            async authorize(credentails) {
                const client = await connectDatabase();
                const checkUser = await client.db.collection("userTable");
            },
        }),
    ],
});
