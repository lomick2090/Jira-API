import createTable from "./create-table";
import deleteTable from "./delete-table";
import insertRowsAsStream from "./insert-rows";
import tableExists from "./table-exists";

export default class BQ {
    static createTable = createTable;
    static deleteTable = deleteTable;
    static insertRows = insertRowsAsStream;
    static tableExists = tableExists;
}