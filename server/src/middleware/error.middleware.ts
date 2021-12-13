import logger from '../configs/logs';
import ApiError from '../error/ApiError';

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    logger.error(`${err.status}: ${err.message}`);
    return res.status(err.status).json({message: err.message});
  }
  logger.error(err);
  return res.status(500).json({message: 'Непредвиденная ошибка!'})
}

export default errorMiddleware;