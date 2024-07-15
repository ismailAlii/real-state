import { toCapitalize } from '../helper/helperFunctions.js';
import AppError from '../utils/appError.js';

const handleDuplicateFieldDB = (error) => {
  const field = error.meta.target.split('_')[1];
  const message = `${toCapitalize(field)} aleardy used!`;
  return new AppError(message, 400);
};
const handleNotFound = (error) => {
  const modelName = error.meta.modelName;
  const message = `${modelName} not Found`;
  return new AppError(message, 404);
};
const handleEmptyRequest = () => {
  const message = 'No data Found to Update!';
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknow error: don't leak error details
  } else {
    // 1) Log error
    // console.log('|||ERROR|||', err);

    // // 2) Send genaric message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export default (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err, message: err.message };
  if (err.code === 'P2002') {
    error = handleDuplicateFieldDB(error);
  }
  if (error.code === 'P2023') {
    error = handleNotFound(error);
  }
  if (err.type === 'entity.parse.failed') {
    error = handleEmptyRequest();
  }
  sendErrorProd(error, res);
};
