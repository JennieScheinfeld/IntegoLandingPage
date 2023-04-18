const secrets = require("./secrets.json")
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: secrets.mysqlPassword,
  database: "logs"
});

const insertRow = ({tableName, data}) => {
    const columns = Object.keys(data).join(",")
    const values = Object.values(data)
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (?,?,?)`;
    try {
       
        pool.query(query, values);

    } catch(e) {
        console.log(e)
    }
}



// pool.query('SELECT * FROM user_actions', (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(results);
//   }
// });

//pool.end();

module.exports = {insertRow}
