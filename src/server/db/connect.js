
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if(mongoose.connection.readyState === 1){
      console.log("Already Connected");
      return;
    }
    // Attempt to connect to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message if connection is successful
    console.log(`🌍 MongoDB Connected: ${conn.connection.host}`);  // Conn host can give info on the cluster if using Atlas
  } catch (err) {
    // Log the error message if connection fails
    console.error(`❌ MongoDB Connection Error: ${err.message}`);

    // Exit the process after the failure with a non-zero exit code
    process.exit(1);  
  }
};

// Export the function so it can be used in server.js
export default connectDB;
