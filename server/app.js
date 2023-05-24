const express = require('express');
const { json } = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/uploadRouter');
const questionRouter = require('./routes/questionRouter');
const reviewRouter = require('./routes/reviewRouter');
const chatRouter = require('./routes/chatRouter');
const reportRouter = require('./routes/reportRouter');
const messageRouter = require('./routes/messageRouter');
const settingsRouter = require('./routes/settingsRouter');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const { validateChat } = require('./controllers/aiController');
const schedule = require('node-schedule');
const { dateToCron } = require('./utils/utilFuncs');
const paymentRouter = require('./routes/paymentRouter');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
// app.use(xss());
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! Please try again later',
});

const date = JSON.parse(
  fs.readFileSync(`${__dirname}/settings.json`, 'utf-8')
).hateSpeechScheduledAt;
// running hate speech detection
const expr = dateToCron(new Date(date));
schedule.scheduleJob(expr, async function () {
  await validateChat();
  console.log('validated');
});

app.use('/api', limiter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/settings', settingsRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/payment', paymentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
