import getIssuesByProject from './apiFunctions/GetIssuesByProject'
import createTable from './bigQueryFunctions/CreateTable'
import deleteTable from './bigQueryFunctions/DeleteTable'
import tableExists from './bigQueryFunctions/TableExists'
import insertRows from './bigQueryFunctions/InsertRows'

async function pullIssuesAndCreateDatabase(datasetId: string, projectId: string) {

    const issues = await getIssuesByProject(projectId);
    const tableBool: boolean = await tableExists(datasetId, projectId);

    if (tableBool) {
        await deleteTable(datasetId, projectId);
    }

    await createTable(datasetId, projectId);
    await insertRows(datasetId, projectId, issues);
}

pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3]);