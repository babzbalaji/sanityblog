import client from "@sanity/client";

export default client({
  projectId: "gp437nhz",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-08-31",
});
