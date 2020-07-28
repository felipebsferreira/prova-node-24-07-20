import express, { Request, Response } from 'express';
import users from './users';

const routes = express.Router();

// Home routes
routes.get('/', (request: Request, response: Response) => {
    response.send('<h1>Teste</h1>');
});

// User routes
routes.use('/users', users);

export default routes;