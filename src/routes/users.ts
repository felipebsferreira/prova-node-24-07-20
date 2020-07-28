import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middlewares/userValidator';

const routes = express.Router();

routes.get('/', userController.index);
routes.get('/:id', userValidator.validate('show'), userController.show);

routes.post('/', userValidator.validate('create'), userController.create);
routes.put('/', userValidator.validate('update'), userController.update);
routes.delete('/', userValidator.validate('delete'), userController.delete);

export default routes;