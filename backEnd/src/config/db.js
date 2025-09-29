import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("connect to DB success");
    } catch (error) {
        console.error("error to connect to DB");
        process.exit(1);
    }
};