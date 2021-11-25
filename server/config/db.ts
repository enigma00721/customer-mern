import mongoose from 'mongoose';
const DB_URL = 'mongodb://127.0.0.1:27017/customer';

mongoose.connect(DB_URL)
    .then(() => console.log('db connection established'))
    .catch((err) => console.log('db connection failed'));