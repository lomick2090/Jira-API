import getIssuesByProject from './apiFunctions/GetIssuesByProject'
import createTable from './bigQueryFunctions/CreateTable'
import deleteTable from './bigQueryFunctions/DeleteTable'
import tableExists from './bigQueryFunctions/TableExists'
import insertRows from './bigQueryFunctions/InsertRows'

async function pullIssuesAndCreateDatabase(databaseId: string, projectId: string) {

    const issues = await getIssuesByProject(projectId);
    const tableBool: boolean = await tableExists(databaseId, projectId);

    if (tableBool) {
        await deleteTable(databaseId, projectId);
    }

    await createTable(databaseId, projectId);
    await insertRows(databaseId, projectId, issues);
}

pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3]);