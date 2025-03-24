import { error } from "console";
import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDB connected');
        })
        connection.on('error',(error)=>{
            console.log('Error: ',error);
            process.exit();
        })
    }catch(err){
        console.log(err);
    }
}