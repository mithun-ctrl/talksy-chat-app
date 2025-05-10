import mongoose from 'mongoose';
import {config} from '../config.js';

export const connectDatabase = async () =>{
    try{
        const conn = await mongoose.connect(config.MONGODB_URI);
        console.log("Database connected " +conn.connection.host);
    }catch(error){
        console.log(error);
    }
};

