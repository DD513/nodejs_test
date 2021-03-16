import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import http from 'http';
import indexRouter from './routes/index'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../view')));  //沒有讀到會進到靜態頁面
app.use(morgan('dev'));
app.use(cors());

require('dotenv').config();

app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);

const server = http.createServer(app); //把上面使用到的套件引入

server.listen(3000); //port

server.on('listening', () => {
    const addr = server.address();
    console.log(`this is server on ${addr.port}`);
})