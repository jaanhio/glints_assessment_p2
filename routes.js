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

  // register new user
  app.post('/api/user/new', userCtrl.create(db));

  // get user collections
  app.get('/api/user/:userId/collections', userCtrl.getUserCollections(db));

  // get specific user collection name
  app.get('/api/user/:userId/collections/:collectionId/name', userCtrl.getCollectionName(db));

  // add new user collection
  app.post('/api/user/:userId/collections/new', userCtrl.addCollection(db));

  // delete user collection
  app.post('/api/user/:userId/collections/:collectionId/delete', userCtrl.deleteCollection(db));

  // edit user collection
  app.post('/api/user/:userId/collections/:collectionId/edit', userCtrl.editCollectionName(db));

  // see list of restaurants in user collection
  app.get('/api/user/:userId/collections/:collectionId', userCtrl.getUserCollectionDetails(db));

  // add restaurants to user collection
  app.post('/api/user/:userId/collections/:collectionId/new/:restaurantId', userCtrl.addCollectionDetails(db));

  // remove restaurants from user collection
  app.post('/api/user/:userId/collections/:collectionId/delete/:restaurantId', userCtrl.deleteCollectionDetails(db));

  /*Restaurant routes*/
  // get list of restaurants 
  app.get('/api/restaurants', restaurantCtrl.getRestaurantList(db));

  // get restaurant details
  app.get('/api/restaurants/:restaurantId', restaurantCtrl.getRestaurantDetails(db));

}
