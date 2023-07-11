require('dotenv').config();

const username: string | undefined = process.env.ATLASSIAN_USERNAME
const password: string | undefined  = process.env.ATLASSIAN_API_KEY
const domain: string | undefined  = process.env.DOMAIN

interface IssueReturn {
    project: string,
    id: string,
    summary: string,
    description: string | null,
    assignee: {
      displayName: string,
      accountId: string
    } | null,
    reporter: {
      displayName: string,
      accountId: string
    } | null,
    priority: "Highest" | "High" | "Medium" | "Low" | "Lowest",
    created: string,
    duedate: string | null,
    timespent: number | null
}

export default async function getIssuesByProject(projectKey:string) {
    let result: IssueReturn[] = [];

    const bodyData = `{
        "fields": [
            "summary",
            "description",
            "assignee",
            "reporter",
            "priority",
            "duedate",
            "created",
            "timespent"
        ],
        "jql": "project = ${projectKey}"
    }`

    await fetch(`https://${domain}.atlassian.net/rest/api/3/search`, {
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
    .then(text => { 
        return JSON.parse(text);
    })
    .then((data : any) => data.issues.forEach((issue : any, index: number)=> {
        let field = issue.fields
        result.push({
            project: projectKey,
            id: issue.key,
            summary: field.summary,
            description: (field?.description) ? field?.description.content[0].content[0].text : null,
            assignee: (field?.assignee) ? {
                displayName: field.assignee.displayName,
                accountId: field.assignee.accountId
            } : null,
            reporter: (field?.reporter)? {
                displayName: field.reporter.displayName,
                accountId: field.reporter.accountId
            } : null,
            priority: field.priority.name,
            created: issue.fields.created.split('T')[0],
            duedate: issue.fields.duedate,
            timespent: issue.fields.timespent
        })
    }))
    .catch(err => console.error(err));

    return result
}