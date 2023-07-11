import getIssuesByProject from './apiFunctions/getIssuesByProject'
import createTable from './bigQueryFunctions/createTable'
import deleteTable from './bigQueryFunctions/deleteTable'
import tableExists from './bigQueryFunctions/tableExists'
import insertRows from './bigQueryFunctions/insertRows'

async function pullIssuesAndCreateDatabase(databaseId: string, projectId: string) {

    const issues = await getIssuesByProject(projectId)
    const tableBool: boolean = await tableExists(databaseId, projectId)

    if (tableBool) {
        await deleteTable(databaseId, projectId)
    }

    await createTable(databaseId, projectId)
    await insertRows(databaseId, projectId, issues)
}

pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3])