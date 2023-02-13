const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    const conn = await mongoose.connect(process.env.DB_URL, connectionParams);

    console.log(`MongoDB Connected: ${conn}`);
  } catch (error) {
    console.log(`MongoDB Not connected ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
