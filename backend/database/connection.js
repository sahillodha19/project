const mongoose = require('mongoose');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://developer420:YNCTBTxudvaGdBaC@cluster0.orw4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    // Connecting to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Uncomment the following if you want to use the strict mode
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

