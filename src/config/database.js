const mongoose = require("mongoose");

const connectDB = async () => {
 const connectionInstance = await mongoose.connect(
    "mongodb+srv://asgharkhattak789:asghar0506@cluster0.sphws.mongodb.net/devTinder"
  );
  console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
};

module.exports = {
  connectDB,
};
