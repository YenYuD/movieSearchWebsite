import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DB_NAME}.fymps2b.mongodb.net/?retryWrites=true&w=majority`
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

export async function getAllDocuments(
    client: MongoClient,
    collection: any,
    sort = {},
    filter = {}
) {
    const db = client.db();

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();

    return documents;
}
