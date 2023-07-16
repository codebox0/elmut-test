import request from 'supertest';
import app from '../../src/app';


describe('GET /recommendations', () => {
    it('should return all recommendations', async () => {
        const response = await request(app).get('/recommandations');
        expect(response.status).toBe(200);
        // expect to be an array
        expect(response.body.data).toEqual(expect.any(Array));

        // expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /recommendations/:id', () => {
    it('should return recommendation with given id', async () => {
        const response = await request(app).get('/recommandations/1');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual({
            id: "1",
            race: 'european',
            animal_type: 'cat',
            min_coef: 0,
            max_coef: 2,
            recipes_slug: ["cat-recipe-1",
                "cat-recipe-2",
                "cat-recipe-3",
                "cat-recipe-6",
              ],
        });
    });

    it('should return 404 if recommendation with given id does not exist', async () => {
        const response = await request(app).get('/recommandations/1233');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({error: 'Recommendation not found'});

        // expect(response.body).toEqual({message: 'Recommendation not found'});
    });
});

describe('POST /recommandations/find', () => {
    it('should return recommendations that match the search criteria', async () => {
        const search = {
            // race: 'dog',
            animal_type: 'dog',
            min_coef: 0,
            max_coef: 4
        };
        const response = await request(app)
            .post('/recommandations/find')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(search);

        expect(response.status).toBe(200);
        expect(response.body.data.recipes_slug).toEqual(expect.any(Array));
    });

    it('should return an empty array if no recommendations match the search criteria', async () => {
        const response = await request(app)
            .post('/recommandations/find')
            .send({
                race: 'human',
                animal_type: 'horse',
                min_coef: 3.0,
                max_coef: 4.0
            });
        expect(response.status).toBe(200);
        expect(response.body.recipes_slug).toEqual(undefined);
    });

    it('should return 400 if search criteria are invalid', async () => {
        const response = await request(app)
            .post('/recommandations/find')
            .send({
                animal_types: 'dog',
                race: 'dog',
                min_coef: 1.5
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual('Une erreur s\'est produite');
    });
});