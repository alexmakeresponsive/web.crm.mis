import client from "../../bootstrap/db/session/mongo";

const dbName    = 'test';
const tableName = 'sessions';

export const findBySessionID = (id:any) => {
    return new Promise((resolve, reject) => {

        client.connect((err:any) => {
            const collection = client.db(dbName).collection(tableName);

            // console.log('id for find: ', id);

            // collection.find().toArray((err:any, docs:any) => {
            //     console.log("Found ALL the following records");
            //     console.log(docs);
            // });

            collection.find({_id: id}).toArray((err:any, docs:any) => {
                // console.log("Found the following records");
                // console.log(docs);
                // client.close();
                resolve(docs);
            });
        });
    });
};