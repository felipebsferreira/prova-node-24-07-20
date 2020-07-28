import knex from '../database/connection';
import User from '../interfaces/IUser';

export default {
    async index(): Promise<User[]> {
        try {
            const users: User[] = await knex
                .select('*')
                .from<User>('users');
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },

    async getById(id: number): Promise<User> {
        try {
            const user: User[] = await knex
                .select('*')
                .from<User>('users')
                .where('id', id);

            return user[0];
        } catch (error) {
            throw new Error(error);
        }
    },

    async getByKey(key: string, value: any): Promise<User[]> {
        try {
            const users: User[] = await knex
                .select('*')
                .from<User>('users')
                .where(key, value);

            return users;
        } catch (error) {
            throw new Error(error);
        }
    },
    
    async create(user: User): Promise<number> {
        try {
            const id:number = (await knex('users').insert(user))[0];
            return id;
        } catch (error) {
            throw new Error(error);
        }
    },

    async update(user: User): Promise<boolean> {
        try {
            const id = user.id;
            user.id = undefined;

            await knex('users')
                .where('id', id)
                .update(user);

            return true;
        } catch (error) {
            throw new Error(error);
        }
    },

    async delete(id: number): Promise<number> {
        try {
            const rowsDeleted = await knex('users')
                .where('id', id)
                .delete();

            return rowsDeleted;
        } catch(error) {
            throw new Error(error);
        }
    },
}