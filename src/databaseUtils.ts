import mongoose from 'mongoose';
import { Db } from './api/comment/node_modules/mongodb';

export let database: Db;

export function connectDatabase(): Promise<Db> {
  const username = '';
  const password = '';
  const host = 'localhost';
  const port = '27017';
  const databaseName = 'snapfork';
  return new Promise<Db>((resolve, reject) => {
    const url = 'mongodb://'/*${username}:${password}@*/ + `${host}:${port}/${databaseName}`;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const connection = mongoose.connection;

    connection.on('error', function (err) {
      console.error('Error connecting to DB', err);
      return reject('Error connecting to DB');
    });

    connection.once('open', function () {
      console.log('Connection to DB successful');
      database = connection.db;
      return resolve(database);
    });
  });
}
