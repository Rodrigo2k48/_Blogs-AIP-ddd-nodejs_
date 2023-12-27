import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../../../../../application/webService/app';
// import { TokenManager } from '../../../../../domain/entities/Token/TokenManager';
import request from 'supertest';
import Sinon from 'sinon';
import { USER_EMAIL, USER_IMAGE, USER_IN_DB, USER_NAME, USER_PASSWORD } from './userRoute.mock';
import { Model } from 'sequelize';
import HTTP_STATUS from '../../../../../domain/error/httpStatusCode';

describe('application User route - POST', () => {
  describe('/user - POST', () => {
    const app = new App().app;
    describe('in case of success', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('must be possible to register a new user in the database, if the data passed is passed correctly - 201', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([{ dataValues: USER_IN_DB } as unknown as Model, true]);
        const response = await request(app).post('/user').send({
          email: USER_EMAIL,
          password: USER_PASSWORD,
          user_name: USER_NAME,
          image: USER_IMAGE,
        });
        expect(response.status).toBe(HTTP_STATUS.SuccessCreated);
        expect(response.body).toHaveProperty('token');
      });
    });
    describe('in case of error', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('If the user tries to register an email that already exists in the database, an error should be triggered in the application - 409', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([null as unknown as Model, false]);
        const response = await request(app).post('/user').send({
          email: USER_EMAIL,
          password: USER_PASSWORD,
          user_name: USER_NAME,
          image: USER_IMAGE,
        });
        expect(response.status).toBe(HTTP_STATUS.ConflictError);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Conflict');
      });
      it('if the information passed in the request body is missing or contains abnormal information, an error is triggered in the application - 400', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([{ dataValues: USER_IN_DB } as unknown as Model, true]);
        const response = await request(app).post('/user').send({
          sweet: 'candy',
          fruit: 'banana',
        });
        expect(response.status).toEqual(HTTP_STATUS.ClientErrorBadRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Some required fields are missing');
      });
    });
  });
});
