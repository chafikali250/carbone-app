const request = require('supertest');
const app = require('./server');

describe('API AI Carbon Footprint', () => {
  test('GET /health doit retourner un statut UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: 'UP' });
  });

  test('POST /calculate-emissions doit calculer correctement les émissions', async () => {
    const res = await request(app)
      .post('/calculate-emissions')
      .send({ promptCount: 10 });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.estimatedCo2Grams).toEqual(40);
  });

  test('POST /calculate-emissions doit rejeter un nombre négatif', async () => {
    const res = await request(app)
      .post('/calculate-emissions')
      .send({ promptCount: -5 });

    expect(res.statusCode).toEqual(400);
  });
});
