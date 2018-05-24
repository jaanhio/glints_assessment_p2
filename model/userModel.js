const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (pool) => {
  return {
    create: (user, callback) => {
      let queryString = 'INSERT INTO users (first_name, last_name, email, password, token) VALUES ($1, $2, $3, $4, $5)';
      let token = jwt.sign({ id: user.email }, process.env.secret, {
        expiresIn: 86400
      });
      // hash the password before inserting into psql db
      bcrypt.hash(user.password, 1, (err, hash) => {
        let values = [
          user.firstName,
          user.lastName,
          user.email,
          hash,
          token
        ];
        pool.query(queryString, values, (error, queryResult) => {
          callback(error, queryResult, token);
        });
      });
    },
    login: (user, callback) => {
      let inputLogin = [user.email];
      let inputPW = user.password;
      let queryString = 'SELECT * from users WHERE email = $1';
      // querying db for user email
      pool.query(queryString, inputLogin, async (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          // if user not found, return error indicating user not found
          if (queryResult.rows[0] === undefined) {
            console.log('user not found');
            callback(error, queryResult.rows[0]);
          }
          // if user found, retrieve hashed password and compare with input password
          // return comparison result 
          else {
            let hashedPW = queryResult.rows[0].password;
            let result = await bcrypt.compare(inputPW, hashedPW);
            callback(error, result, queryResult.rows[0]);
          }
        }
      });
    },
    getUserCollections: (userId, callback) => {
      let queryString = 'SELECT collections.id as collection_id, collections.collection_name, users.id as user_id FROM collections JOIN users ON (collections.user_id = users.id) WHERE users.id = $1;';
      pool.query(queryString, [userId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult.rows);
        }
      });
    },
    addCollection: (userId, userInput, callback) => {
      let { collectionName } = userInput;
      let inputValues = [collectionName, userId];
      let queryString = 'INSERT INTO collections (collection_name, user_id) VALUES ($1, $2);';
      pool.query(queryString, inputValues, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    },
    deleteCollection: (userId, collectionId, callback) => {
      let queryString = 'DELETE FROM collections WHERE collections.id = $1;';
      pool.query(queryString, [collectionId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    }
  }
}