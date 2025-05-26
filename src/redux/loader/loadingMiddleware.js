import { setLoading } from './loaderSlice';

const loadingMiddleware = () => (next) => (action) => {
  if (action.type.endsWith('/pending')) {
    next(setLoading(true));
  }
  if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
    next(setLoading(false));
  }

  return next(action);
};

export default loadingMiddleware;
