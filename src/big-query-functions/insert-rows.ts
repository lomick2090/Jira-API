import { Issue } from "../api-functions/get-issues-by-project";
import { BigQuery } from "@google-cloud/bigquery";
//inserts rows into a given table 
export default async function insertRowsAsStream(datasetId: string, tableId: string,  rows: Issue[] ): Promise<void> {
    const bigquery = new BigQuery();

    await bigquery
        .dataset(datasetId)
        .table(tableId)
        .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
}