import { Issue } from "../apiFunctions/GetIssuesByProject";
//inserts rows into a given table 
export default async function insertRowsAsStream(datasetId: string, tableId: string,  rows: Issue[] ): Promise<void> {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

    await bigquery
        .dataset(datasetId)
        .table(tableId)
        .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
}
