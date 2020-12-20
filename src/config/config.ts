
 export const JWTSECRETS = process.env.JWT || 'secretKey';

 export const DB = {
    URI: process.env.DB_URI || 'localhost:27017/snapfork',
    USER: process.env.DB_USER || 'admin',
    PASSWORD: process.env.DB_PASSWORD || 'admin'
  };
