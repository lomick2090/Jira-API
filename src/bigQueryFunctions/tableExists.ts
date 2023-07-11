//returns  a promise with true if table exists, or false if not

export default async function tableExists(tableId: string, datasetId: string) {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

  const dataset = bigquery.dataset(datasetId);

  try {
    await dataset.table(tableId).get();
    return true
  } catch (error) {
    console.log(error.message);
    return false
  }
}