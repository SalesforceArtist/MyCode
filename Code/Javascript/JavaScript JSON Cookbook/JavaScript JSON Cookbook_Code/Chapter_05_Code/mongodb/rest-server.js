var express = require('express'),
  documents = require('./routes/documents')
  cors = require('cors'),
  bodyParser = require('body-parser'),
  multer = require('multer'); 


var app = express();

app.use(cors());
var jsonParser = bodyParser.json();


app.get('/documents', documents.findAll);
app.get('/documents/:id', documents.findById);
app.post('/documents', jsonParser, documents.addDocuments);
app.put('/documents/:id', jsonParser, documents.updateDocuments);
app.delete('/documents/:id', jsonParser, documents.deleteDocuments);

app.listen(3000);
console.log('Listening on port 3000...');
