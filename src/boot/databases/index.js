import  clc  from 'cli-color';
import mongoose from "mongoose";

export let mongooseConnections = {};


export async function start() {
   const connection = await mongoose.connect(
    process.env.DB_CONNECTION_STRING)

    mongooseConnections['core'] = connection
    console.log(clc.bgGreen.black("DB Connected..."));
}
