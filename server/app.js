const express = require('express');
const { json } = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/uploadRouter');
const questionRouter = require('./routes/questionRouter');
const chatRouter = require('./routes/chatRouter');
const reportRouter = require('./routes/reportRouter');
const messageRouter = require('./routes/messageRouter');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const app = express();
const { validateChat } = require('./controllers/aiController');
const schedule = require('node-schedule');

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

// running hate speech detection
schedule.scheduleJob('0 1 * * *', async function () {
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

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
