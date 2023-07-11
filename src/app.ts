import getIssuesByProject from './apiFunctions/getIssuesByProject'
import createTable from './bigQueryFunctions/createTable'
import deleteTable from './bigQueryFunctions/deleteTable'
import tableExists from './bigQueryFunctions/tableExists'
import insertRows from './bigQueryFunctions/insertRows'

//deleteTable('IT', 'Issues')

async function pullIssuesAndCreateDatabase(projectId: string, databaseId: string) {

    const issues = await getIssuesByProject(projectId)
    const tableBool: boolean = await tableExists(projectId, databaseId)

    if (tableBool) {
        await deleteTable(projectId, databaseId)
    }

    await createTable(projectId, databaseId)
    await insertRows(projectId, databaseId, issues)
}

console.log(process.argv)

pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3])