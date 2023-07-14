//Deletes given table in given database 
export default async function deleteTable(datasetId: string, tableId: string): Promise<void> {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

    await bigquery
        .dataset(datasetId)
        .table(tableId)
        .delete();
    console.log(`Table ${tableId} deleted.`);
}