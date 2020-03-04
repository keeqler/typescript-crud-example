import { Router } from 'express';

import PostController from './controllers/PostController';

const routes = Router();

routes.post('/users', PostController.store);
routes.get('/users', PostController.index);
routes.get('/users/:id', PostController.show);
routes.patch('/users/:id', PostController.update);
routes.delete('/users/:id', PostController.delete);

export default routes;
