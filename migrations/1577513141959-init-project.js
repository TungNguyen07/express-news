import mongoose from 'mongoose';
import { ADMIN } from "../enums/userRole";
import Users from "../model/user.model";
const systemUser = {
  username: 'admin',
  password: '123456',
  phone: '0343062244',
  email: 'admin@gmail.com',
  permission: ADMIN,
  name: "THANH QUY VO"
};

const insertSystemUser = () => new Users(systemUser).save();

const { MONGO_URL, MONGO_DB, MONGO_OPTIONS } = process.env;


const mongoUrl = MONGO_URL || 'mongodb://localhost:27017';
const dbName = MONGO_DB || 'express-news';
const option = MONGO_OPTIONS
  ? JSON.parse(MONGO_URL)
  : {
      useNewUrlParser: true
    };


const connectDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl + '/' + dbName, option, err => {
      if (err) {
        reject(err);
      }
      resolve(mongoose);
    });
  });
};

module.exports.up = async function() {
  const db = await connectDb();
  await insertSystemUser();
  await db.disconnect();
};

module.exports.down = async function() {
  const db = await connectDb();

  await Promise.all([
    Users.deleteOne({ username: systemUser.username }),
  ]);

  await db.disconnect();
};
