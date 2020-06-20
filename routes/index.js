import product from './product.routes';
import user from './user.routes';

export default (app) => {
  app.use('/api/v1/product', product);
  app.use('/api/v1/user', user);
};
