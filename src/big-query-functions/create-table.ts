import { BigQuery } from "@google-cloud/bigquery";
//Creates new table 
export default async function createTable(  
    datasetId: string, // Existing dataset
    tableId: string, // Table to be created
    schema: any
) : Promise<void> {
    const bigquery = new BigQuery();

    const options = {
        schema: schema,
        location: 'US',
    };

    // Create a new table in the dataset
    const [table] = await bigquery
        .dataset(datasetId)
        .createTable(tableId, options);
    console.log(`Table ${table.id} created`);
}