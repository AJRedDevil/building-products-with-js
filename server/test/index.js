// npm packages
import test from 'tape';
import request from 'supertest';

// our packages
import app from '../src/app';

test('GET /', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      const expectedBody = 'Hello world!';
      const acutalBody = res.text;

      t.error(err, 'No error');
      t.equal(acutalBody, expectedBody, 'Retrieve body');
      t.end();
    });
});
