var axios = require('axios');
require('dotenv').config();

const username: string | undefined = process.env.ATLASSIAN_USERNAME
const password: string | undefined  = process.env.ATLASSIAN_API_KEY
const domain: string | undefined  = process.env.DOMAIN
const projectKey: string | undefined = process.env.PROJECT_KEY

//Gets all issues in a particular project using the Jira Cloud REST API

const bodyData = `{
    "fields": [
        "summary",
        "status",
        "assignee",
        "timespent",
        "priority",
        "created",
        "creator",
    ],
    "jql": "project = ${projectKey}"
}`

async function getIssues() {
    fetch(`https://${domain}.atlassian.net/rest/api/3/search`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(
            `${username}:${password}`
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyData
    })
    .then(response => {
        console.log(
        `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

getIssues()