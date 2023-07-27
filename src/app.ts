import getIssuesByProject from './api-functions/get-issues-by-project'
import BQ from './big-query-functions/big-query-service-class';
import issueSchema from './schemas/issue-schema'

async function pullIssuesAndCreateDatabase(datasetId: string, projectId: string) {
    const issues = await getIssuesByProject(projectId);
    const isTable = await BQ.tableExists(datasetId, projectId);

    if (isTable) {
        await BQ.deleteTable(datasetId, projectId);
    }
    
    await BQ.createTable(datasetId, projectId, issueSchema);

    console.log('Waiting 10 seconds for table to be accessible')
    //Timeout set to avoid inconsistencies with server-side availability of newly created tables
    setTimeout(async () => {
        await BQ.insertRows(datasetId, projectId, issues)
    }, 10000)
}

//node app.js <datasetId> <projectId>
pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3]);