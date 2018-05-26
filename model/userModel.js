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
    findUserId: (userEmail, callback) => {
      let queryString = 'SELECT id, first_name, last_name, email, token FROM users WHERE email = $1;';
      pool.query(queryString, [userEmail], (error, queryResult) => {
        callback(error, queryResult);
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
      // let queryString1 = 'DELETE FROM collections WHERE collections.id = $1;';
      let queryString = 'DELETE from collectiondetails WHERE collectiondetails.collection_id = $1;';
      pool.query(queryString, [collectionId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          let queryString = 'DELETE from collections where collections.id = $1;';
          pool.query(queryString, [collectionId], (error, queryResult) => {
            if (error) {
              console.log(error);
            }
            else {
              callback(error, queryResult);
            }
          });
        }
      });
    },
    getUserCollectionDetails: (userId, collectionId, callback) => {
      let queryString = 'SELECT collection_id, collection_name, restaurant_id, restaurants.name AS restaurant_name FROM collectiondetails JOIN collections ON (collections.id = collectiondetails.collection_id) JOIN restaurants ON (restaurants.id = collectiondetails.restaurant_id) WHERE collection_id = $1;';
      pool.query(queryString, [collectionId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          console.log(queryResult);
          callback(error, queryResult.rows);
        }
      });
    },
    addCollectionDetails: (userId, collectionId, restaurantId, callback) => {
      let inputValues = [collectionId, restaurantId];
      let queryString = 'INSERT INTO collectiondetails (collection_id, restaurant_id) VALUES ($1, $2);';
      pool.query(queryString, inputValues, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    },
    deleteCollectionDetails: (userId, collectionId, restaurantId, callback) => {
      let inputValues = [collectionId, restaurantId];
      let queryString = 'DELETE from collectiondetails where collectiondetails.collection_id = $1 and collectiondetails.restaurant_id = $2;';
      pool.query(queryString, inputValues, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    },
    getCollectionName: (collectionId, callback) => {
      let queryString = 'SELECT collections.id, collections.collection_name FROM collections where collections.id = $1;';
      pool.query(queryString, [collectionId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    },
    editCollectionName: (collectionId, collectionName, callback) => {
      let queryString = 'UPDATE collections set collection_name = $1 where id =$2;';
      pool.query(queryString, [collectionName.collectionName, collectionId], (error, queryResult) => {
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