import { MongoClient } from "mongodb";
import { Client } from "@elastic/elasticsearch";

const mongoUri = "mongodb://localhost:27017";
const dbName = "onboarding-tasks";
const collectionName = "users1";

const esClient = new Client({ node: "http://localhost:9200" });
const indexName = "abhilaksh_users2";

export const bulkIndex = async () => {
  const mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);

  const cursor = collection.find();
  const bulkOperations: any[] = [];

  await cursor.forEach((doc) => {
    const { _id, ...rest } = doc;
    bulkOperations.push({ index: { _index: indexName, _id: _id.toString() } });
    bulkOperations.push(rest);
  });

  if (bulkOperations.length > 0) {
    const response = await esClient.bulk({ body: bulkOperations });
    if (response.errors) {
      response.items.forEach((item, index) => {
        if (item.index && item.index.error) {
          console.error(
            `Error indexing document at index ${index}:`,
            item.index.error
          );
        }
      });
    } else {
      console.log("All documents indexed successfully.");
    }
  } else {
    console.log("No documents found for indexing.");
  }

  await mongoClient.close();
};
