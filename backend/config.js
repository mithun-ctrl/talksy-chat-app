import dotenv from "dotenv";
dotenv.config();

export const config ={
    PORT: process.env.PORT || 7070,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    ORIGIN_URL: "https://spicy-cecil-vitsmithun-c7bff47a.koyeb.app"
}