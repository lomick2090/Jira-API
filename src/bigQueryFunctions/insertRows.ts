
export default async function insertRowsAsStream(tableId: string, datasetId: string, rows: any ) {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

    await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
}
