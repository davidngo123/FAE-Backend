import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import apiRouter from './routes/api/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import models from './models.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    req.models = models
    next();
})

app.use('/api/', apiRouter);
app.use('/', (req, res) => {

    try {
        res.status(200).send({
            status: 'success',
            payload: { status: 'health check' }
        })
    } catch (error) {
        req.status(500).send({
            status: 'error',
            payload: 'healthcheck'
        })
    }
})

export default app;