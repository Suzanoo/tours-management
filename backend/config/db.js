const mongoose = require('mongoose');

const connectDB = async (HOST) => {
  try {
    // const DB = process.env.DATABASE_LOCAL;
    const DB = HOST.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

    mongoose.set('strictQuery', false);

    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    //   .then((conn) => {
    //     console.log(conn.connection);
    //     console.log('[INFO] Connection established!');
    //   });

    console.log(`[INFO] Conneced to MongoDB in ${process.env.NODE_ENV} mode.`);
    // console.log(process.env); // see all nodejs env
    // console.log(app.get('env'));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
