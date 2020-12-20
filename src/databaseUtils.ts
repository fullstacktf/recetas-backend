import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { DB } from './config/config';

export let database: Db;

export function connectDatabase(): Promise<Db> {
  return new Promise<Db>((resolve, reject) => {
    const url = `mongodb://${DB.USER}:${DB.PASSWORD}@${DB.URI}`;
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
      console.log('Connection to DB successfull');
      database = connection.db;
      return resolve(database);
    });
  });
}
