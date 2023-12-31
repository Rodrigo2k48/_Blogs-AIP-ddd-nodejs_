import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../../../../../application/webService/app';
// import { TokenManager } from '../../../../../domain/entities/Token/TokenManager';
import request from 'supertest';
import Sinon from 'sinon';
import { DATABASE_MOCK, TOKEN_VALID, USER_EMAIL, USER_IMAGE, USER_IN_DB, USER_NAME, USER_PASSWORD } from './userRoute.mock';
import { Model } from 'sequelize';
import HTTP_STATUS from '../../../../../domain/error/httpStatusCode';

describe('application User route - POST', () => {
  const app = new App().app;
  describe('/user - POST', () => {
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
  describe('/user - GET', () => {
    describe('in case of sucess', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('If the user has a valid token, it must be possible to have access to all users registered in the database', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: DATABASE_MOCK } as Model]);
        const response = await request(app)
          .get('/user')
          .set({
            Authorization: TOKEN_VALID,
          })
          .send();
        expect(response.status).toBe(HTTP_STATUS.SuccessOK);
        expect(response.body).toHaveProperty('users');
        expect(response.body.users).not.toHaveLength(0);
      });
    });
    describe('in case of token error', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('If the user has an invalid token, an error should be triggered in the application - 401', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: DATABASE_MOCK } as Model]);
        const response = await request(app)
          .get('/user')
          .set({
            Authorization: 'invalid token',
          })
          .send();
        expect(response.status).toBe(HTTP_STATUS.ClientErrorUnauthorized);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Token must be a valid token');
      });
      it('If the user does not have any type of token, whether valid or invalid, an error must be triggered in the application - 401', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: DATABASE_MOCK } as Model]);
        const response = await request(app).get('/user').send();
        expect(response.status).toBe(HTTP_STATUS.ClientErrorUnauthorized);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Token Not found');
      });

      it('If the user does not have any type of token, whether valid or invalid, an error must be triggered in the application - 401', async () => {
        Sinon.stub(Model, 'findAll').throwsException('dataBase Error');
        const response = await request(app)
          .get('/user')
          .set({
            Authorization: TOKEN_VALID,
          })
          .send();
        expect(response.status).toBe(HTTP_STATUS.InternalServerError);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Sinon-provided dataBase Error');
      });
    });
    describe('in case of database error', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('If an unknown error occurs or the database crashes at the time of the request, in addition to the error being triggered in the application, it must be specified through a message', async () => {
        Sinon.stub(Model, 'findAll').throwsException('dataBase Error');
        const response = await request(app)
          .get('/user')
          .set({
            Authorization: TOKEN_VALID,
          })
          .send();
        expect(response.status).toBe(HTTP_STATUS.InternalServerError);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Sinon-provided dataBase Error');
        Sinon.restore();
        Sinon.stub(Model, 'findAll').throwsException('another dataBase Error');
        const newResponse = await request(app)
          .get('/user')
          .set({
            Authorization: TOKEN_VALID,
          })
          .send();
        expect(newResponse.status).toBe(HTTP_STATUS.InternalServerError);
        expect(newResponse.body).toHaveProperty('message');
        expect(newResponse.body.message).toBe('Sinon-provided another dataBase Error');
      });
    });
  });
});
