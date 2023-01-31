require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { limiter } = require('./middlewares/limiter');
const { MONGO_URL } = require('./utils/config');

const { PORT = 3000, NODE_ENV, MONGO_ENV } = process.env;
const app = express();
const routes = require('./routes/index');

mongoose.set('strictQuery', false);
mongoose.connect(NODE_ENV === 'production' ? MONGO_ENV : MONGO_URL, { useNewUrlParser: true });

app.use(cors()); // ПЕРВЫМ!
app.use(helmet());
app.use(express.json()); // для собирания JSON-формата
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(routes); // подключаем обработчики роутов
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // подключаем обработчик ошибок celebrate
app.use(errorHandler); // подключаем централизованный обработчик ошибок
app.listen(PORT, () => { console.log(`App listening port ${PORT}`); });
