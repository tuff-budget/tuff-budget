/* eslint-disable arrow-body-style */
const request = require('supertest');
const server = 'http://localhost:3000/';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  // afterAll(() => {
  //   return request(server)
  //     .put();
  // });

  describe('Perform endpoint CRUD tests for budget', () => {
    describe('GET at endpoint /budgets to get all budgets', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status', () => {
        const userID = 1;
        const endpoint = '/budgets/1'
        console.log(userID)
        return request(server)
          .get('/budgets/1')
          .expect(200);
      });
    });
  });

  // describe('Perform endpoint CRUD tests for budget', () => {
  //   describe('POST at endpoint endpoints', () => {
  //     // Note that we return the evaluation of `request` here! It evaluates to
  //     // a promise, so Jest knows not to say this test passes until that
  //     // promise resolves. See https://jestjs.io/docs/en/asynchronous
  //     it('responds with 200 status and text/html content type', () => {
  //       return request(server)
  //         .get('/')
  //         .expect(200);
  //     });
  //   });
  // });

});



// test('testendpoint', async () => {
//   const response = await request.post('student').send({
//     "firstName": "chris",
//     "lastName": "cheng",
//     "age": 31

//   })

//   expect(response.status).toBe(200);
// });