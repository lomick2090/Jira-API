import pullIssuesAndCreateDatabase from "./pull-issues-and-create-database.js";

//node app.js <datasetId> <projectId>
pullIssuesAndCreateDatabase(process.argv[2] , process.argv[3]);