import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const conn2 = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});
  
  conn2.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      return;
    }
    console.log("Connected to the clientdatabase");
  });


export default conn2;


