var mongo = require('mongodb');

var mongoServer = mongo.Server,
    database = mongo.Db,
    objectId = require('mongodb').ObjectID;

var server = new mongoServer('localhost', 27017, {auto_reconnect: true});
db = new database('test', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'test' database");
    db.collection('documents', {strict:true}, function(err, collection) {
      if (err) {
        console.log("Inserting sample data...");
        populate();
      }
    });
  }
});

exports.findById = function(req, res) {
  var id = new objectId(req.params.id);
  console.log('Retrieving documents: ' + id);
  db.collection('documents', function(err, collection) {
    collection.findOne({'_id':id}, function(err, item) {
    res.send(item);
    });
  });
};

exports.findAll = function(req, res) {
  db.collection('documents', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.addDocuments = function(req, res) {
  var documents = req.body;
  console.log('Adding documents: ' + JSON.stringify(documents));
  db.collection('documents', {safe:true}, function(err, collection) {
    collection.insert(documents, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
 });
}

exports.updateDocuments = function(req, res) {
  var id = new objectId(req.params.id);
  var documents = req.body;
  console.log('Updating documents: ' + id);
  console.log(JSON.stringify(documents));
  db.collection('documents', function(err, collection) {
    collection.update({'_id':id}, documents, {safe:true}, 
      function(err, result) {
        if (err) {
          console.log('Error updating documents: ' + err);
          res.send({'error':'An error has occurred'});
        } else {
          console.log('' + result + ' document(s) updated');
          res.send(documents);
        }
    });
  });
}

exports.deleteDocuments = function(req, res) {
  var id = new objectId(req.params.id);
  console.log('Deleting documents: ' + req.params.id);

  db.collection('documents', function(err, collection) {
    collection.remove({'_id':id}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}

var populate = function() {
  var documents = [
  {
    call: 'kf6gpe',
    lat: 37,
    lng: -122,
  }];
  db.collection('documents', function(err, collection) {
    collection.insert(wines, {safe:true}, function(err, result) {});
  });
};

