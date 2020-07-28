import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/IUser';
import UserModel from '../models/User';

export default {
    validate(method: string): any {
        switch (method) {
            case 'show':
                return validateShow;

            case 'create':
                return validateCreate;
            
            case 'update':
                return validateUpdate;

            case 'delete':
                return validateDelete;
        }
    }
}

async function validateShow(request: Request, response: Response, next: NextFunction) {
    try {
        const errors = [];
        const { id } = request.params;

        if (!id) {
            errors.push({
                msg: "ID não informado.",
                param: "id",
                location: "params",
            });
        } else {
            const foundUser: User = await UserModel.getById(Number(id));

            if (!foundUser) {
                errors.push({
                    msg: "O id informado não existe.",
                    value: id,
                    param: "id",
                    location: "params",
                });
            } else {
                (request as any).foundUser = foundUser;
            }
        }

        if (errors.length > 0) {
            return response.json({
                success: false,
                errors,
            });
        }

        return next();
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            errors: [{
                msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
            }],
        });
    }
}

async function validateCreate(request: Request, response: Response, next: NextFunction) {
    try {
        const errors = [];
        const { 
            name,
            username,
            email
        } = request.body;

        if (!name) {
            errors.push({
                msg: "Nome não informado.",
                param: "name",
                location: "body",
            });
        }

        if (!username) {
            errors.push({
                msg: "Nome de usuário não informado.",
                param: "username",
                location: "body",
            });
        }

        if (!email) {
            errors.push({
                msg: "E-mail não informado.",
                param: "email",
                location: "body",
            });
        } else if (!isEmail(email)) {
            errors.push({
                msg: "O e-mail informado não é válido.",
                value: email,
                param: "email",
                location: "body",
            });
        } else {
            const foundUsers: User[] = await UserModel.getByKey("email", email);
            if (foundUsers.length > 0) {
                errors.push({
                    msg: "O e-mail informado já está em uso por outro usuário.",
                    value: email,
                    param: "email",
                    location: "body",
                });
            }
        }

        if (errors.length > 0) {
            return response.json({
                success: false,
                errors,
            });
        }

        return next();
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            errors: [{
                msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
            }],
        });
    }
}

async function validateUpdate(request: Request, response: Response, next: NextFunction) {
    try {
        const errors = [];
        const {
            id,
            name,
            username,
            email
        } = request.body;

        if (!id) {
            errors.push({
                msg: "ID não informado.",
                param: "id",
                location: "body",
            });
        } else {
            const foundUser: User = await UserModel.getById(Number(id));

            if (!foundUser) {
                errors.push({
                    msg: "O id informado não existe.",
                    value: id,
                    param: "id",
                    location: "body",
                });
            }
        }

        if (name === "") {
            errors.push({
                msg: "O nome não deve estar vazio.",
                param: "name",
                location: "body"
            });
        }

        if (username === "") {
            errors.push({
                msg: "O nome de usuário não deve estar vazio.",
                param: "username",
                location: "body"
            });
        }

        if (email === "") {
            errors.push({
                msg: "O e-mail não deve estar vazio.",
                param: "email",
                location: "body"
            });
        }
        
        if (!name && !username && !email) {
            errors.push({
                msg: "Ao menos um campo deve ser informado.",
                location: "body"
            });
        }

        if (email) {
            if (!isEmail(email)) {
                errors.push({
                    msg: "O e-mail informado não é válido.",
                    value: email,
                    param: "email",
                    location: "body",
                });
            } else {
                const foundUsers: User[] = await UserModel.getByKey("email", email);

                if (foundUsers.length > 0) {
                    errors.push({
                        msg: "O e-mail informado já está em uso por outro usuário.",
                        value: email,
                        param: "email",
                        location: "body"
                    });
                }
            }
        }

        if (errors.length > 0) {
            return response.json({
                success: false,
                errors,
            });
        }

        return next();
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            errors: [{
                msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
            }],
        });
    }
}

async function validateDelete(request: Request, response: Response, next: NextFunction) {
    try {
        const errors = [];
        const { id } = request.query;

        if (!id) {
            errors.push({
                msg: "ID não informado.",
                param: "id",
                location: "query",
            });
        }

        if (errors.length > 0) {
            return response.json({
                success: false,
                errors,
            });
        }

        return next();
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            errors: [{
                msg: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
            }],
        });
    }
}

function isEmail(email: string) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}