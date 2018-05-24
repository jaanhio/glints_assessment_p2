/**
 * Routes file.
 *
 * All routes you want to match in the app will be kept here.
 * Upon match, a corresponding controller method should be called.
 *
 */
const userCtrl = require('./controller/userController');
const restaurantCtrl = require('./controller/restaurantController');


module.exports = (app, db) => {

  /*User routes*/
  // login routes 
  app.post('/api/user/login', userCtrl.login(db));

  // // logout 
  // app.get('/api/user/:userId/logout', userCtrl.logout);

  // register new user
  app.post('/api/user/new', userCtrl.create(db));

  // // get user details
  // app.get('/api/user/:userId', userCtrl.getUserDetails);

  // get user collections
  app.get('/api/user/:userId/collections', userCtrl.getUserCollections(db));

  // add new user collection
  app.post('/api/user/:userId/collections/new', userCtrl.addCollection(db));

  // // delete user collection
  app.post('/api/user/:userId/collections/:collectionId/delete', userCtrl.deleteCollection(db));

  // // see details on user collection
  // app.get('/api/user/:userId/collections/:collectionId', user.getUserCollectionDetails);

  // // add restaurants to user collection
  // app.get('/api/user/:userId/collections/:collectionId/new/:restaurantId');

  // // remove restaurants from user collection
  // app.post('/api/user/:userId/collections/:collectionId/delete/:restaurantId');

  // // get user friends
  // app.get('/api/user/:userId/friends/', userCtrl.getUserFriends);

  // // add user friend
  // app.get('/api/user/:usedId/friends/:friendId', userCtrl.addFriend);

  // // delete user friend
  // app.post('/api/user/:userId/friends/:friendId/delete', userCtrl.deleteFriend);


  /*Restaurant routes*/
  // get list of restaurants 
  app.get('/api/restaurants', restaurantCtrl.getRestaurantList(db));

  // get restaurant details
  app.get('/api/restaurants/:restaurantId', restaurantCtrl.getRestaurantDetails(db));
}
