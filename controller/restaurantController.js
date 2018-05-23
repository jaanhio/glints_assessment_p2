/**
 * Restaurant controller functions.
 *
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

const getRestaurantList = (db) => {
  return (request, response) => {
    db.restaurant.getRestaurantList((error, queryResult) => {
      if (error) {
        console.log('error retrieving');
        console.log(error);
        response.send('error retrieving restaurant listing');
      }
      else {
        console.log('Success retrieving restaurant listing');
        let data = [];
        // structuring the response in suitable format for frontend
        queryResult.rows.forEach(result => {
          // for each result, check if it already exists in the data array by determining its index
          let resultIndex = data.findIndex(item => {
            return item.name === result.name;
          });
          // if result/name already exists, add the subsequent opening hour data to its exisiting opening hours array
          if (resultIndex > -1) {
            // for each of openingHour segment, check if incoming start_time & end_time already exists
            let openHoursIndex = data[resultIndex].openHours.findIndex(openHourSegment => {
              return openHourSegment.startTime === result.start_time && openHourSegment.endTime === result.end_time
            });
            // if start_time & end_time already exists, add to day & dayId arrays
            if (openHoursIndex > -1) {
              data[resultIndex].openHours[openHoursIndex].day.push(result.day);
              data[resultIndex].openHours[openHoursIndex].dayId.push(result.day_id);
            }
            else {
              data[resultIndex].openHours.push({
                day: [result.day],
                dayId: [result.day_id],
                startTime: result.start_time,
                endTime: result.end_time
              });
            }
          }
          // if result/name do not exist, add new entry to data array
          else {
            data.push({
              name: result.name,
              imgUrl: 'https://source.unsplash.com/featured/480x320/?{food}',
              restaurantId: result.restaurant_id,
              openHours: [
                {
                  day: [result.day],
                  dayId: [result.day_id],
                  startTime: result.start_time,
                  endTime: result.end_time
                }
              ]
            });
          }
        });
        response.send(data);
      }
    });
  }
}

const getRestaurantDetails = (db) => {
  return (request, response) => {
    const restaurantId = request.params.restaurantId;
    db.restaurant.getRestaurantDetails(restaurantId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
        response.send('error retrieving restaurant details');
      }
      else {
        console.log('Success retrieving restaurant details');
        response.send(queryResult);
      }
    });
  }
}

module.exports = {
  getRestaurantList,
  getRestaurantDetails
};