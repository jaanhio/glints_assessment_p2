const create = (db) => {
  return (request, response) => {
    let userDetails = request.body;
    // console.log(userDetails);
    db.user.create(userDetails, (error, queryResult, token) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log(queryResult);
        console.log(userDetails);
        const userEmail = userDetails.email;
        // response.status(200).send({
        //   auth: true
        // });
        db.user.findUserId(userEmail, (error, queryResult) => {
          if (error) {
            console.log(error.stack);
          }
          else {
            const { id, first_name, last_name, email, token } = queryResult.rows[0];
            response.status(200).send({
              auth: true,
              queryResult: {
                userId: id,
                firstName: first_name,
                lastName: last_name,
                email: email,
                token
              }
            });
          }
        });
      }
    });
  }
};

const login = (db) => {
  return (request, response) => {
    let userDetails = request.body;
    db.user.login(userDetails, (error, hashCheckResult, queryResult) => {
      if (error) {
        console.log('error stack is here');
        console.log(error.stack);
      }
      else {
        if (hashCheckResult === true) {
          console.log(queryResult);
          const { id, last_name, first_name, email, token } = queryResult;
          response.status(200).send({
            auth: true,
            queryResult: {
              userId: id,
              firstName: first_name,
              lastName: last_name,
              email: email,
              token
            }
          });
        }
        else {
          console.log('hashCheckResult is false');
        }
      }
    });
  }
};

const getUserCollections = (db) => {
  return (request, response) => {
    let { userId } = request.params;
    console.log(userId);
    db.user.getUserCollections(userId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send(queryResult);
      }
    });
  }
};

const addCollection = (db) => {
  return (request, response) => {
    let { userId } = request.params;
    let userInput = request.body;
    db.user.addCollection(userId, userInput, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          addCollectionSuccess: true
        });
      }
    });
  }
};

const deleteCollection = (db) => {
  return (request, response) => {
    let { userId, collectionId } = request.params;
    console.log(collectionId);
    db.user.deleteCollection(userId, collectionId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          deleteCollectionSuccess: true
        });
      }
    });
  }
};

const getUserCollectionDetails = (db) => {
  return (request, response) => {
    let { userId, collectionId } = request.params;
    db.user.getUserCollectionDetails(userId, collectionId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log(queryResult);
        // let collectionName = queryResult[0].collection_name;

        // response.status(200).send({
        //   collectionName: collectionName,
        //   queryResult: queryResult
        // });
        response.status(200).send(queryResult);
      }
    });
  }
};

const addCollectionDetails = (db) => {
  return (request, response) => {
    let { userId, collectionId, restaurantId } = request.params;
    db.user.addCollectionDetails(userId, collectionId, restaurantId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          addRestaurantSuccess: true
        });
      }
    });
  }
}

const deleteCollectionDetails = (db) => {
  return (request, response) => {
    let { userId, collectionId, restaurantId } = request.params;
    db.user.deleteCollectionDetails(userId, collectionId, restaurantId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          deleteRestaurantSuccess: true
        });
      }
    });
  }
}

const editCollectionName = (db) => {
  return (request, response) => {
    let { collectionId } = request.params;
    let collectionName = request.body;
    console.log(collectionName);
    console.log(collectionId);
    db.user.editCollectionName(collectionId, collectionName, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          updateCollectionName: true
        });
      }
    });
  }
}

const getCollectionName = (db) => {
  return (request, response) => {
    let { collectionId } = request.params;
    db.user.getCollectionName(collectionId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send(queryResult.rows[0]);
      }
    });
  }
}

module.exports = {
  create,
  login,
  getUserCollections,
  addCollection,
  deleteCollection,
  getUserCollectionDetails,
  addCollectionDetails,
  deleteCollectionDetails,
  editCollectionName,
  getCollectionName
}