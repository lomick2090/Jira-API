import getIssuesByProject from './apiFunctions/GetIssuesByProject'
import createIssueTable from './bigQueryFunctions/CreateIssueTable'
import deleteTable from './bigQueryFunctions/DeleteTable'
import tableExists from './bigQueryFunctions/TableExists'
import insertRows from './bigQueryFunctions/InsertRows'

async function pullIssuesAndCreateDatabase(datasetId: string, projectId: string) {
    const issues = await getIssuesByProject(projectId);
    const tableBool = await tableExists(datasetId, projectId);

    if (tableBool) {
        await deleteTable(datasetId, projectId);
    }

    await createIssueTable(datasetId, projectId);
    await insertRows(datasetId, projectId, issues);
}

pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3]);