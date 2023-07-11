//creates new table with Issue schema

export default async function createTable(  
    tableId: string, // Table to be created
    datasetId = 'Issues', // Existing dataset
    schema = [
        {name: 'project', type: 'STRING', mode: 'REQUIRED'},
        {name: 'summary', type: 'STRING', mode: 'REQUIRED'},
        {name: 'description', type: 'STRING', mode: 'NULLABLE'},
        {name: 'assignee', type: 'RECORD', mode:'NULLABLE', fields:[
            {
                name: 'displayName',
                type: 'STRING',
                mode: 'REQUIRED'
            },
            {
                name: 'accountId',
                type: 'STRING',
                mode: 'REQUIRED'
            }
        ]},
        {name: 'reporter', type: 'RECORD', mode:'NULLABLE', fields:[
            {
                name: 'displayName',
                type: 'STRING',
                mode: 'REQUIRED'
            },
            {
                name: 'accountId',
                type: 'STRING',
                mode: 'REQUIRED'
            }
        ]},
        {name: 'priority', type: 'STRING', mode: 'NULLABLE'},
        {name: 'created', type: 'STRING', mode: 'REQUIRED'},
        {name: 'duedate', type: 'STRING', mode: 'NULLABLE'},
        {name: 'timespent', type: 'INT64', mode: 'NULLABLE'},
    ]
) {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();

    const options = {
        schema: schema,
        location: 'US',
    };

    // Create a new table in the dataset
    const [table] = await bigquery
        .dataset(datasetId)
        .createTable(tableId, options);

    console.log(`Table ${table.id} created.`);
}