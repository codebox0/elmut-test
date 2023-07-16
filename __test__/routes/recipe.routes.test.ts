import request from 'supertest';
import app from '../../src/app';

describe('GET /', () => {
    it('should return all recipes', async () => {
        const response = await request(app).get('/recipes');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expect.any(Array));
    });
});

describe('GET /:id', () => {
    it('should return a recipe with the given ID', async () => {
        const response = await request(app).get('/recipes/1');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expect.objectContaining({
            id: "1",
            animal: "dog",
        }));
    });

    it('should return 404 if recipe with given ID does not exist', async () => {
        const response = await request(app).get('/recipes/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({error: 'Recipe not found'});
    });
});
