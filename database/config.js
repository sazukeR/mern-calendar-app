const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to connect to database");
  }
};

module.exports = {
  dbConection,
};
