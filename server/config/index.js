import dotenv from 'dotenv';
dotenv.config();

export const {
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET,
    APP_URL,
    LINK_URL,
    USER,
    PASSWORD,
} = process.env;