import { Client } from "@elastic/elasticsearch";

export const client = new Client({ node: "http://localhost:9200" });

client
  .info()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
