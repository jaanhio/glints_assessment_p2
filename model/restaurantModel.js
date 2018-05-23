/**
 * Restaurants model functions.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

module.exports = (pool) => {
  return {
    getRestaurantList: (callback) => {
      let queryString = 'SELECT restaurant_id, name, day, days.id AS day_id , start_time, end_time FROM restaurants JOIN openingtime ON (openingtime.restaurant_id = restaurants.id) JOIN days ON (days.id = openingtime.day_id) order by name, days.id;';
      pool.query(queryString, (error, queryResult) => {
        callback(error, queryResult);
      });
    },
    getRestaurantDetails: (restaurantId, callback) => {
      let queryString = 'SELECT restaurant_id, name, day, start_time, end_time FROM restaurants JOIN openingtime ON (openingtime.restaurant_id = restaurants.id) JOIN days on (days.id = openingtime.day_id) where restaurants.id = $1;';
      let value = [parseInt(restaurantId)];
      pool.query(queryString, value, (error, queryResult) => {
        callback(error, queryResult.rows);
      });
    }
  }
}