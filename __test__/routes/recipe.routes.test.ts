import request from 'supertest';
import app from '../src/app';

describe('Recipe routes', () => {
    describe('GET /', () => {
        it('should return all recipes', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe('GET /:id', () => {
        it('should return a recipe with the given ID', async () => {
            const response = await request(app).get('/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                id: 1,
                name: 'Recipe 1',
                // other recipe properties
            }));
        });

        it('should return 404 if recipe with given ID does not exist', async () => {
            const response = await request(app).get('/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Recipe not found' });
        });
    });

    describe('POST /find', () => {
        it('should return recipes that match the search criteria', async () => {
            const response = await request(app)
                .post('/find')
                .send({
                    race: 'human',
                    min_coef: 1.5,
                    max_coef: 2.5,
                });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
            expect(response.body.length).toBeGreaterThan(0);
            response.body.forEach((recipe) => {
                expect(recipe.race).toBe('human');
                expect(recipe.coefficient).toBeGreaterThanOrEqual(1.5);
                expect(recipe.coefficient).toBeLessThanOrEqual(2.5);
            });
        });

        it('should return 400 if search criteria are invalid', async () => {
            const response = await request(app)
                .post('/find')
                .send({
                    race: 'invalid',
                    min_coef: 'invalid',
                    max_coef: 'invalid',
                });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Invalid search criteria' });
        });
    });
});
