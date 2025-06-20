const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db_Url = process.env.DB_URL;
    // const db_name = process.env.DB_NAME;
    
    if (!db_Url) {
      throw new Error('DB_URL is not defined in environment variables');
    }
    
    await mongoose.connect(db_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };