const mongoose = require("mongoose");

const URI = process.env.MONGO_DB_URI

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connect to the database");
  } catch (error) {
    console.log("database connection fail",error);
    process.exit(0);
  }
};

module.exports = { connectdb }
