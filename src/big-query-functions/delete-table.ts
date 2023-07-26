import { BigQuery } from "@google-cloud/bigquery";
//Deletes given table in given database 
export default async function deleteTable(datasetId: string, tableId: string): Promise<void> {
    const bigquery = new BigQuery();

    await bigquery
        .dataset(datasetId)
        .table(tableId)
        .delete();
    console.log(`Table ${tableId} deleted`);
}