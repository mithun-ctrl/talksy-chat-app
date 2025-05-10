import express from 'express';
import { config } from './config.js';
import authRoutes from './routes/auth.route.js';
import { connectDatabase } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import messageRoute from "./routes/message.route.js";
import {app, server, io}  from './lib/socket.js';
import path from "path"

const __dirname = path.resolve();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoute);

if(config.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    });
}

const PORT = config.PORT;
server.listen(PORT, () =>{
    console.log(`Backend running on port ${PORT}`)
    connectDatabase()

});
