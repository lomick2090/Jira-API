
//insterts rows into a given table 
export default async function insertRowsAsStream(datasetId: string, tableId: string,  rows: any ) {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

    await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
}
