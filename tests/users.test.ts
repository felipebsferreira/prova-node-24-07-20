import api from './api';

describe("POST /users", () => {
    it("creates an user", async () => {
        const data = {
            name: "João",
            username: "joao",
            email: "joao@gmail.com",
        };

        let response = await api.post('/users', data);
        
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "João",
            username: "joao",
            email: "joao@gmail.com",
            id: 1,
        });

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user without a name", async () => {
        const data = {
            username: "elton",
            email: "elton@gmail.com",
        };
        let response = await api.post('/users', data);

        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'name');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user with a blank name", async () => {
        const data = {
            name: "",
            username: "elton",
            email: "elton@gmail.com",
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'name');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user without an username", async () => {
        const data = {
            name: "Elton",
            email: "elton@gmail.com",
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'username');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user with a blank username", async () => {
        const data = {
            name: "Elton",
            username: "",
            email: "elton@gmail.com",
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'username');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user without an email", async () => {
        const data = {
            name: "Elton",
            username: "elton"
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'email');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user with a blank email", async () => {
        const data = {
            name: "Elton",
            username: "elton",
            email: "",
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'email');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user with an invalid email", async () => {
        const data = {
            name: "Elton",
            username: "elton",
            email: "elton",
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'email');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does not create an user with an existing email", async () => {
        const data = {
            name: "Elton",
            username: "elton",
            email: "joao@gmail.com",
        };

        let response = await api.post('/users', data);
        
        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'email');

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });

    it("does creates a valid second user", async () => {
        const data = {
            name: "Elton",
            username: "elton",
            email: "elton@gmail.com",
        };

        let response = await api.post('/users', data);
        
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "Elton",
            username: "elton",
            email: "elton@gmail.com",
            id: 2,
        });

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(2);
    });
});

describe("GET /users/1", () => {
    it("shows the user 1", async () => {
        const response = await api.get('/users/1');

        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "João",
            username: "joao",
            email: "joao@gmail.com",
            id: 1,
        });
    });

    it("does not show an invalid user 50", async () => {
        const response = await api.get('/users/50');

        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'id');
    });

    it("does not show an user with an invalid id", async () => {
        const response = await api.get('/users/text');

        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'id');
    });
});

describe("PUT /users", () => {
    it("updates only the name of an existing user", async () => {
        const data = {
            name: "Carlos",
            id: 1,
        };

        let response = await api.put('/users', data);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);

        response = await api.get(`/users/${data.id}`);

        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "Carlos",
            username: "joao",
            email: "joao@gmail.com",
            id: 1,
        });
    });

    it("updates only the username of an existing user", async () => {
        const data = {
            username: "carlos_silva",
            id: 1,
        };

        let response = await api.put('/users', data);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);

        response = await api.get(`/users/${data.id}`);

        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "Carlos",
            username: "carlos_silva",
            email: "joao@gmail.com",
            id: 1,
        });
    });

    it("updates only the e-mail of an existing user", async () => {
        const data = {
            email: "carlos@gmail.com",
            id: 1,
        };

        let response = await api.put('/users', data);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);

        response = await api.get(`/users/${data.id}`);

        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "Carlos",
            username: "carlos_silva",
            email: "carlos@gmail.com",
            id: 1,
        });
    });

    it("does not update an user with an existing e-mail", async () => {
        const data = {
            email: "elton@gmail.com",
            id: 1,
        };

        let response = await api.put('/users', data);

        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'email');
    });

    it("does not update an user without providing the his id", async () => {
        const data = {
            name: "Sara",
            username: "sara",
            email: "sara@gmail.com",
        };

        let response = await api.put('/users', data);

        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
        expect(response.data.errors[0]).toHaveProperty('param', 'id');
    });

    it("does not update an user without providing at least one field", async () => {
        const data = {
            id: 1,
        };

        let response = await api.put('/users', data);

        expect(response.data).toHaveProperty('success', false);
        expect(response.data).toHaveProperty('errors');
    });
});

describe("DELETE /users?id=1", () => {
    it("delete the user 1", async () => {
        let response = await api.delete('/users?id=1');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);
        expect(response.data).toHaveProperty('rowsDeleted', 1);

        response = await api.get('/users');

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
    });
});

