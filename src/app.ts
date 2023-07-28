import getIssuesByProject from './api-functions/get-issues-by-project'
import BigQueryService from './big-query/big-query.service';
import issueSchema from './schemas/issue-schema'

async function pullIssuesAndCreateDatabase(datasetId: string, projectId: string) {
    const issues = await getIssuesByProject(projectId);
    const isTable = await BigQueryService.tableExists(datasetId, projectId);

    if (isTable) {
        await BigQueryService.deleteTable(datasetId, projectId);
    }
    
    await BigQueryService.createTable(datasetId, projectId, issueSchema);

    console.log('Waiting 10 seconds for table to be accessible')
    //Timeout set to avoid inconsistencies with server-side availability of newly created tables
    setTimeout(async () => {
        await BigQueryService.insertRows(datasetId, projectId, issues)
    }, 10000)
}

//node app.js <datasetId> <projectId>
pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3]);