import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/error.controller.js';

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: '10kb', // limit data that client send to 10 kilobits
  })
);
app.use(cookieParser());

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

// handle not found error
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// Error handling middleware
app.use(globalErrorHandler);

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server online on port: ${PORT}`);
});
