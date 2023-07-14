import getIssuesByProject from './ApiFunctions/GetIssuesByProject'
import createIssueTable from './BigQueryFunctions/CreateIssueTable'
import deleteTable from './BigQueryFunctions/DeleteTable'
import tableExists from './BigQueryFunctions/TableExists'
import insertRows from './BigQueryFunctions/InsertRows'

export default async function pullIssuesAndCreateDatabase(datasetId: string, projectId: string) {
    const issues = await getIssuesByProject(projectId);
    const tableBool = await tableExists(datasetId, projectId);

    if (tableBool) {
        await deleteTable(datasetId, projectId);
    }

    await createIssueTable(datasetId, projectId);
    await insertRows(datasetId, projectId, issues);
}