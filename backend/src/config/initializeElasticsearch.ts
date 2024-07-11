import { Client } from "@elastic/elasticsearch";

export const client = new Client({ node: "http://localhost:9200" });

export async function createIndex() {
  try {
    const indexExists = await client.indices.exists({
      index: "users",
    });

    if (!indexExists) {
      await client.indices.create({
        index: "users",
        body: {
          mappings: {
            properties: {
              name: {
                type: "text",
                analyzer: "standard",
              },
              email: {
                type: "keyword",
              },
            },
          },
        },
      });
      console.log('Index "users" created successfully');
    } else {
      console.log('Index "users" already exists');
    }
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

export async function deleteIndex() {
  try {
    await client.indices.delete({
      index: "users",
    });
    console.log('Index "users" deleted successfully');
  } catch (error) {
    console.error("Error deleting index:", error);
  }
}