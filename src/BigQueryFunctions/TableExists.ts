//returns a promise with true if table exists, or false if not
export default async function tableExists(datasetId: string, tableId: string) : Promise<boolean> {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();
    const dataset = bigquery.dataset(datasetId);

    try {
        await dataset.table(tableId).get();
        return true;
    } catch (error) {
        return false;
    }
}