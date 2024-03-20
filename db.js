import mysql from "mysql";
import { promisify } from "util";

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Admin123",
  database: "users",
});

// Promisify the query method of mysqlPool
const query = promisify(mysqlPool.query).bind(mysqlPool);

export default query;
