import { BigQuery } from "@google-cloud/bigquery";

export default class BigQueryService {
    static bigquery = new BigQuery()

    //Creates a new table in the dataset
    static async createTable(  
        datasetId: string, // Existing dataset
        tableId: string, // Table to be created
        schema: any
    ) : Promise<void> {
        const options = {
            schema: schema,
            location: 'US',
        };
    
        const [table] = await this.bigquery
            .dataset(datasetId)
            .createTable(tableId, options);
        console.log(`Table ${table.id} created`);
    }

    //Deletes table in the dataset
    static async deleteTable(datasetId: string, tableId: string): Promise<void> {
        await this.bigquery
            .dataset(datasetId)
            .table(tableId)
            .delete();
        console.log(`Table ${tableId} deleted`);
    }

    //Inserts rows into a table
    static async insertRows(datasetId: string, tableId: string,  rows: Issue[] ): Promise<void> {   
        await this.bigquery
            .dataset(datasetId)
            .table(tableId)
            .insert(rows);
        console.log(`Inserted ${rows.length} rows`);
    }

    //Returns a promise containing true if the table exists and false if not
    static async tableExists(datasetId: string, tableId: string) : Promise<boolean> {
        const dataset = this.bigquery.dataset(datasetId);
    
        try {
            await dataset.table(tableId).get();
            return true;
        } catch (error) {
            return false;
        }
    }
}