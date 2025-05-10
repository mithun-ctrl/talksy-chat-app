import express from 'express';
import { config } from './config.js';
import authRoutes from './routes/auth.route.js';
import { connectDatabase } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import messageRoute from "./routes/message.route.js";
import {app, server, io}  from './lib/socket.js';
import path from "path"

const PORT = config.PORT;

const _dirname = path.resolve();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: config.ORIGIN_URL,
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoute);

app.use(express.static(path.join(_dirname, "../frontend/dist")));

app.get('/*any', (_, res) =>{
    res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"));
})


server.listen(PORT, () =>{
    console.log(`Backend running on port ${PORT}`)
    connectDatabase()

});
