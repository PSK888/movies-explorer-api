require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const expressRateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3001 } = process.env;
const limiter = expressRateLimit({ windowMs: 10 * 60 * 1000, max: 1000 });
const app = express();
const routes = require('./routes/index');

app.use(cors()); // ПЕРВЫМ!

app.use(helmet());

app.use(limiter);

app.use(cookieParser());

app.use(express.json()); // для собирания JSON-формата

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/moviesdb', { useNewUrlParser: true });

app.use(requestLogger); // подключаем логгер запросов

app.use(routes); // подключаем обработчики роутов

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // подключаем обработчик ошибок celebrate

app.use(errorHandler); // подключаем централизованный обработчик ошибок

app.listen(PORT, () => { console.log(`App listening port ${PORT}`); });
