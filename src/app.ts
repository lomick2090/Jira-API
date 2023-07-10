//import getIssuesByProject from './apiFunctions/getIssuesByProject'
//import {callAppendRows} from './bigQueryFunctions/uploadIssues'
require('dotenv').config();

const username: string | undefined = process.env.ATLASSIAN_USERNAME
const password: string | undefined  = process.env.ATLASSIAN_API_KEY
const domain: string | undefined  = process.env.DOMAIN

//getIssuesByProject('IT').then((res: any) => console.log(res))


export async function callAppendRows() {
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigquery = new BigQuery();
    const dataset = bigquery.dataset('institutions');

    const tableId = 'institution_data';

    const options = {
        schema: 'PROJECT,ID,SUMMARY,DESCRIPTION,ASSIGNEE_NAME,ASSIGNEE_ID,REPORTER_NAME,REPORTER_ID,PRIORITY,CREATED,DUE,TIMESPENT'
    };

    dataset.createTable(tableId, options, (err: any, table: any, apiResponse: any) => {});

    //-
    // If the callback is omitted, we'll return a Promise.
    //-
    dataset.createTable(tableId, options).then((data: any) => {
        const table = data[0];
        const apiResponse = data[1];
    });
}

callAppendRows();