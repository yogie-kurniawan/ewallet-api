import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
import { createTables } from "../utils/createTables.js";

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  })
  .promise();

await createTables();

export default pool;
