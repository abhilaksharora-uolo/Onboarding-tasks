import { Client } from "@elastic/elasticsearch";

export const client = new Client({ node: "http://localhost:9200" });

export async function createIndex() {
  try {
    const indexExists = await client.indices.exists({
      index: "abhilaksh_users3",
    });

    if (!indexExists) {
      await client.indices.create({
        index: "abhilaksh_users3",
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
              imageName: {
                type: "text",
                index: false,
              },
              hashedPassword: {
                type: "text",
                index: false,
              },
              isDeleted: {
                type: "boolean",
              },
              mongoId: {
                type: "keyword",
              },
              updatedAt: {
                type: "date",
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
