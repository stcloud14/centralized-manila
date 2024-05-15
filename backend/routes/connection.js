import mysql from "mysql";



const conn2 = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "clientdatabase",
  });
  
  conn2.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      return;
    }
    console.log("Connected to the clientdatabase");
  });


export default conn2;


