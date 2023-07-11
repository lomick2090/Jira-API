import getIssuesByProject from './apiFunctions/getIssuesByProject'
import createTable from './bigQueryFunctions/createTable'
import insertRows from './bigQueryFunctions/insertRows'

getIssuesByProject('IT')
    .then(issues => {
        insertRows('IT', 'Issues',issues)
    });