import dotenv from "dotenv";

export interface Issue {
    project: string,
    id: string,
    summary: string,
    description?: string,
    assignee?: {
      displayName: string,
      accountId: string
    },
    reporter?: {
      displayName: string,
      accountId: string
    },
    priority: "Highest" | "High" | "Medium" | "Low" | "Lowest",
    created: string,
    duedate?: string,
    timespent?: number
};

//Pulls Issue data of a given project and returns a promise with the data in a useable format
export default async function getIssuesByProject(projectKey: string) : Promise<Issue[]> {
    dotenv.config();
    const username: string | undefined = process.env.ATLASSIAN_USERNAME;
    const password: string | undefined  = process.env.ATLASSIAN_API_KEY;
    const domain: string | undefined  = process.env.DOMAIN;
    const userAuth = Buffer.from(`${username}:${password}`).toString('base64');

    let isCompleted = false;
    let result: Issue[] = [];
    let startAt = 0;
    
    async function fetchIssues() {
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
            "jql": "project = ${projectKey}",
            "startAt": "${startAt}"
        }`;
        
        const response = await fetch(`https://${domain}.atlassian.net/rest/api/3/search`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${userAuth}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyData
        });

        console.log(`Response: ${response.status} ${response.statusText}`);
        const data = JSON.parse(await response.text());
        
        //Checks for full data pull
        startAt = startAt+50;
        isCompleted = startAt >= data.total;

        data.issues.forEach((issue: any) => {
            const field = issue.fields;
            result.push({
                project: projectKey,
                id: issue.key,
                summary: field.summary,
                description: (field?.description) ? field?.description.content[0].content[0].text : undefined,
                assignee: (field?.assignee) ? {
                    displayName: field.assignee.displayName,
                    accountId: field.assignee.accountId
                } : undefined,
                reporter: (field?.reporter)? {
                    displayName: field.reporter.displayName,
                    accountId: field.reporter.accountId
                } : undefined,
                priority: field.priority.name,
                created: field.created.split('T')[0],
                duedate: (field?.duedate) ? field.duedate : undefined ,
                timespent: (field?.timespent) ? field?.timespent : undefined
            });
        });
    }

    while (!isCompleted) {
        try {
            console.log('Fetching...')
            await fetchIssues()
        } catch (error) {
            console.log(error);
        }
    }
    
    console.log(`${result.length} issues found`)
    return result;
}