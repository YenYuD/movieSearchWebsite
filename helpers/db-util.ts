import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(
        `mongodb+srv://YenyuDiao:${process.env.MONGO_DB_PASSWORD}@cluster0.xwkdcly.mongodb.net/?retryWrites=true&w=majority`
    );

    return client;
}

export async function insertDocument(
    client: MongoClient,
    collection: any,
    document: any
) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
}
