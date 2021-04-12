const mysql = require("mysql2/promise");

async function customQuery(sqlString, fields) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Blog",
  });
  const [data] = await connection.execute(sqlString);
  connection.end();
  return data;
}

module.exports = customQuery;
