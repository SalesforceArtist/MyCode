var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/test';

var insert = function(collection, callback) {
  var documents = 
    [{ 
        call: 'kf6gpe-7', lat: 37.0, lng: 122.0 
      },
      {
        call: 'kf6gpe-9', lat: 38.0, lng: 123.0
      }];
  // Insert some documents
  collection.insert(documents, 
    function(error, result) {
      console.log('Inserted ' +result.length + ' documents ' + 
        'with result: ');
      console.log(result);
      callback(result);
  });
}

var update = function(collection, callback) {
  collection.update({ call:'kf6gpe-7' }, 
    { $set: { lat: 39.0, lng: 121.0 } }, 
    function(error, result) {
      console.log('Updated with error ' + error);
      console.log(result);
      callback(result);
    });
}

var remove = function(collection, callback) {
  collection.remove({},
    function(error, result)
    {
      console.log('remove returned ' + error);
      console.log(result);
      callback(result);
    });
}

mongo.connect(url, function(error, db) {
  console.log("mongo.connect returned " + error);

  // Get the documents collection
  var collection = db.collection('documents');
  remove(collection, function(result) {
    db.close();
  });

/*

  var cursor = collection.find({'call': 'kf6gpe-7'});
  cursor.toArray(function(error, documents) {
    console.log(documents);

    db.close();
  });
*/
});


