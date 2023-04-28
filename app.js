

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import models from './models.js'
import apiRouter from './routes/api/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
// view engine setup
var router = express.Router();
var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', apiRouter);
app.use((req, res, next) => {
  req.models = models
  next();
})

export default router;