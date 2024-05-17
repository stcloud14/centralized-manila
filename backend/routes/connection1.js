import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST1;
const user = process.env.DB_USER1;
const password = process.env.DB_PASSWORD1;
const database1 = process.env.DB_DATABASE1;


const conn1 = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database1,
  });
  
  conn1.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      return;
    }
    console.log("Connected to the admindatabase");
  });


export default conn1;


