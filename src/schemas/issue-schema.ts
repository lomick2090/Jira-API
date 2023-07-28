const issueSchema = [
    {name: 'project', type: 'STRING', mode: 'REQUIRED'},
    {name: 'id', type: 'STRING', mode: 'REQUIRED'},
    {name: 'summary', type: 'STRING', mode: 'REQUIRED'},
    {name: 'description', type: 'STRING', mode: 'NULLABLE'},
    {name: 'assignee', type: 'RECORD', mode:'NULLABLE', 
        fields:[
            {name: 'displayName', type: 'STRING', mode: 'REQUIRED'},
            {name: 'accountId',type: 'STRING',mode: 'REQUIRED'}
        ]
    },
    {name: 'reporter', type: 'RECORD', mode:'NULLABLE', 
        fields:[
            {name: 'displayName',type: 'STRING',mode: 'REQUIRED'},
            {name: 'accountId',type: 'STRING',mode: 'REQUIRED'}
        ]
    },
    {name: 'priority', type: 'STRING', mode: 'NULLABLE'},
    {name: 'created', type: 'STRING', mode: 'REQUIRED'},
    {name: 'duedate', type: 'STRING', mode: 'NULLABLE'},
    {name: 'timespent', type: 'INT64', mode: 'NULLABLE'},
]

export default issueSchema