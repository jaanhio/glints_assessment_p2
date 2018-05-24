const create = (db) => {
  return (request, response) => {
    let userDetails = request.body;
    console.log(userDetails);
    db.user.create(userDetails, (error, queryResult, token) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log(queryResult);
        response.status(200).send({
          auth: true
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
          const { userId, last_name, first_name, email, token } = queryResult;
          response.status(200).send({
            auth: true,
            queryResult: {
              userId,
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
}


module.exports = {
  create,
  login,
  getUserCollections,
  addCollection,
  deleteCollection
}