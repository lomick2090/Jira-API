#Query Jira API for Issues and Upload to BigQuery

This project pulls all issue data for a given project from the Jira API and formats it into a usable object, then checks BigQuery for a matching table, if the table exists it deletes it and then creates a new table with the newly pulled data.


How To:

1. Clone repo
2. Install dependencies ('npm i' in terminal)
3. Create a .env file with proper credentials in the repo root

Your. env file should be in this format: 

ATLASSIAN_USERNAME=\<Your Username\>
ATLASSIAN_API_KEY=\<Your Api Key>
DOMAIN=\<Your Domain\> 

4. Install gcloud CLI 
(instructions here: https://cloud.google.com/sdk/docs/install)
5. Set up gcloud with proper authorization for your BigQuery project 
(instructions here: https://cloud.google.com/sdk/docs/authorizing)
6. Create a new BigQuery dataset that you want to house your issues in
6. Run the typescript compiler ('tsc' in terminal)


Once all this is done, the App.js file in the dist folder is ready to be run, you can run it with this terminal command:

'node App.js \<Your BigQuery Dataset\> \<Your Jira Project Name\>'

The BigQuery dataset is the one you made in step 6, and the Jira project is the ID of the project (i.e. 'Implemented Today' = 'IT') 
