/**
 * Database Connection File
 * ------------------------
 * This file is responsible for connecting our backend
 * application to MongoDB using Mongoose.
 *
 * Why separate file?
 * - Cleaner code
 * - Easy to reuse
 * - Easy to debug
 */

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(`\n\nConnected:\t${process.env.MONGO_URI}\n\n`)
        // Try connecting to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(
            `✅ MongoDB Connected: ${conn.connection.host}`
        );
    } catch (error) {

        console.error("❌ MongoDB connection failed");
        console.error(error.message);

        // Stop app if DB fails
        process.exit(1);
    }
};

export default connectDB;
