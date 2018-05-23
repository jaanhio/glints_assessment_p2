const bcrypt = require('bcrypt');

module.exports = (pool) => {
  return {
    create: (user, callback) => {
      let queryString = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
      bcrypt.hash(user.password, 1, (err, hash) => {
        let values = [
          user.firstName,
          user.lastName,
          user.email,
          hash
        ];
        pool.query(queryString, values, (error, queryResult) => {
          callback(error, queryResult);
        });
      });
    },
    // login: (user, callback) => {
    //   let inputLogin = [user.email];
    //   let inputPW = user.password;
    //   let queryString = 'SELECT * from users where name = $1';

    //   pool.query(queryString, inputLogin, (error, queryResult) => {
    //     if (error) {

    //     }
    //   })
    // }
  }
}