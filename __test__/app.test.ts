import request from 'supertest';
import app from '../src/app';

describe('App Test', () => {
  describe('GET /random-url', () => {
    it('returns 404', async () => {
      const res = await request(app).get('/random-url');

      expect(res.status).toBe(404);
    });
  });

});
