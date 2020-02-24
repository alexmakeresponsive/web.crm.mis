const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://mongoadmin:secret@172.17.0.2:27017';

// Database Name
const dbName = 'myproject';


const insertDocuments = function(db:any, callback:any) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err:any, result:any) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result, collection);
    });
};

// Use connect method to connect to the server
MongoClient.connect(url, function(err:any, client:any) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function(result:any, collection:any) {

        collection.find({}).toArray(function(err:any, docs:any) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
        });

        client.close();
    });
});
