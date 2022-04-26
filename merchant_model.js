const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM user_details ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { user_id, f_name, l_name, phone_no1, phone_no2, email_id } = body;

    pool.query(
      'INSERT INTO user_details (user_id, f_name, l_name, phone_no1, phone_no2, email_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, f_name, l_name, phone_no1, phone_no2, email_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(
          `Data added: ${JSON.stringify(
            results.rows[0]
          )}`
        );
      }
    );
  });
};

const deleteMerchant = (user_details) => {
  return new Promise(function (resolve, reject) {
    const user_id = parseInt(user_details);

    pool.query(
      'DELETE FROM user_details WHERE id = $1',
      [user_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Deleted with ID: ${user_id}`);
      }
    );
  });
};

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
};
