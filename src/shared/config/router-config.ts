import { Application } from 'express';
import routes from '../../app/routes';

export const configureRoutes = (app: Application): void => {
  app.use('/api/v1', routes);
};