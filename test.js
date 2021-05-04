import app from './server.js'
import request from 'supertest'

describe('API testing', () => {
    it('post testing 1', async () => {
      const res = await request(app)
        .post('/reports')
        .send({
          "reportDetails": {
            "userID": "user-1",
            "marketID": "market-1",
            "marketName": "Vashi Navi Mumbai",
            "cmdtyID": "cmdty-1",
            "marketType": "Mandi",
            "cmdtyName": "Potato",
            "priceUnit": "Pack",
            "convFctr": 50,
            "price": 700
          }
        });
      expect(res.statusCode).toEqual(200);
    });

    it('post testing 2', async () => {
      const res = await request(app)
        .post('/reports')
        .send({ 
          "reportDetails": {
            "userID": "user-2",
            "marketID": "market-1",
            "marketName": "Vashi Navi Mumbai",
            "cmdtyID": "cmdty-1",
            "cmdtyName": "Potato",
            "priceUnit": "Quintal",
            "convFctr": 100,
            "price": 1600
          }
      });
      expect(res.statusCode).toEqual(200);
    });

    // it('get testing', async () => {
    //   const res = await request(app)
    //     .get('/reports?reportID=609183e2f69bfd31548e312c')
    //   expect(res.statusCode).toEqual(200);
    // });
});