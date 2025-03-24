import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!); // <-- Add 'await'
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        });

        connection.on('error', (error) => {
            console.log('Error: ', error);
            process.exit(1);
        });
    } catch (err) {
        console.log(err);
    }
}
