import request from 'supertest';
import app from '../../src/app';
import {describe} from "node:test";

describe('Recommendations', () => {

    describe('GET /recommendations', () => {
        it('should return all recommendations', async () => {
            const response = await request(app).get('/recommendations');
            expect(response.status).toBe(200);
            // expect to be an array
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /recommendations/:id', () => {
        it('should return recommendation with given id', async () => {
            const response = await request(app).get('/recommendations/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: 1,
                race: 'dog',
                animal_type: 'cat',
                min_coef: 1.5,
                max_coef: 2.5,
                recipes_slug: ['cat-recipe', 'dog-recipe']
            });
        });

        it('should return 404 if recommendation with given id does not exist', async () => {
            const response = await request(app).get('/recommendations/1233');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Recommendation not found' });
        });
    });

    describe('POST /recommendations/find', () => {
        it('should return recommendations that match the search criteria', async () => {
            const response = await request(app)
                .post('/recommendations/find')
                .send({
                    race: 'dog',
                    animal_type: 'cat',
                    min_coef: 1.5,
                    max_coef: 2.5
                });
            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    id: 1,
                    race: 'dog',
                    animal_type: 'cat',
                    min_coef: 1.5,
                    max_coef: 2.5,
                    recipes_slug: ['cat-recipe', 'dog-recipe']
                }
            ]);
        });

        it('should return an empty array if no recommendations match the search criteria', async () => {
            const response = await request(app)
                .post('/recommendations/find')
                .send({
                    race: 'dog',
                    animal_type: 'cat',
                    min_coef: 3.0,
                    max_coef: 4.0
                });
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return 400 if search criteria are invalid', async () => {
            const response = await request(app)
                .post('/recommendations/find')
                .send({
                    race: 'dog',
                    min_coef: 1.5
                });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Invalid search criteria' });
        });
    });
});
