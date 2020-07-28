import { Request, Response } from 'express';

import User from '../interfaces/IUser';
import UserModel from '../models/User';

export default {
    async index(request: Request, response: Response) {
        try {
            const users: User[] = await UserModel.index();
            return response.json(users);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 
                success: false,
                errors: [{
                    msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
                }]
            });
        }
    },

    async show(request: Request, response: Response) {
        try {
            const { foundUser } = request as any;
            response.json(foundUser);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 
                success: false,
                errors: [{
                    msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
                }],
            });
        }
    },

    async create(request: Request, response: Response) {
        try {
            const user: User = {
                name: request.body.name,
                username: request.body.username,
                email: request.body.email,
            };
            
            user.id = await UserModel.create(user);
            return response.json(user);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 
                success: false,
                errors: [{
                    msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
                }],
            });
        }
    },

    async update(request: Request, response: Response) {
        try {
            const user: User = {
                id: request.body.id,
                name: request.body.name,
                username: request.body.username,
                email: request.body.email,
            };

            const success = await UserModel.update(user);
            return response.json({
                success,
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                success: false,
                errors: [{
                    msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
                }],
            });
        }
    },

    async delete(request: Request, response: Response) {
        try {
            const { id } = request.query;
            const rowsDeleted = await UserModel.delete(Number(id));

            return response.json({
                success: true,
                rowsDeleted
            });
        } catch(error) {
            console.log(error);
            return response.status(500).json({
                success: false,
                rowsDeleted: 0,
                errors: [{
                    msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
                }],
            });
        }
    },
}