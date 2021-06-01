var cradle = require('cradle');
var db = new(cradle.Connection)().database('documents');

/*
db.all(function(err, doc) {
  for(var i = 0; i < doc.length; i++) {
    db.remove(doc[i].id, doc[i].value.rev, function(err, doc) {
      console.log('Removing ' + doc._id);
    });
  }
});

db.save('_design/stations', {
  views: {
    byCall: {
      map: function(doc) {
        if (doc.call) {
          emit(doc.call, doc);
        }
      }
    }
  }
});
*/

/* Item */

var item =  {
  call: 'kf6gpe-7',
  lat: 37,
  lng: -122
};

db.save(item, function (error, result) {
  if (error) {
    console.log(error);
    // Handle error
  } else {
    var id = result.id;

    // Find by Call
    var call = "kf6gpe-7";

    db.view('stations/byCall/key="' + call + '"', function (error, result) {
      if (result) {
        result.forEach(function (row) {
          console.log(row);
        });

        db.merge(id, {call: 'kf6gpe-9'}, function(error, doc) {
          db.get(id, function(error, doc) {
            console.log(doc);
            db.remove(id);
          });
        });
      }
    });
  }
});
