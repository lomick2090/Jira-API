
//deletes table 
export default async function deleteTable(datasetId: string, tableId: string) {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

    await bigquery
    .dataset(datasetId)
    .table(tableId)
    .delete();

    console.log(`Table ${tableId} deleted.`);
}