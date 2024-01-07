import { it, describe, expect, afterEach } from 'vitest';
import request from 'supertest';
import { App } from '../../../../application/webService/app';
import Sinon from 'sinon';
import { PASSWORD_NOT_REGISTERED, EMAIL_NOT_REGISTERED, USER_EMAIL, USER_IN_DB, USER_PASSWORD } from './mocks/authRoute.mock';
import { FindUserByEmail } from '../../../../application/useCases/FindUserByEmail/FindUserByEmail';
import { TokenManager } from '../../../../domain/entities/Token/TokenManager';
import { UserInterface } from '../../../../domain/entities/User/User';
import HTTP_STATUS from '../../../../domain/error/httpStatusCode';

describe('application authentication route - POST', () => {
  describe('/login - POST', async () => {
    const app = new App().app;
    const tokenManager = new TokenManager();
    describe('in case of success', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('if the user is registered in the database, a token must be returned with the data of that respective user - 200', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_IN_DB);
        const response = await request(app).post('/login').send({
          email: USER_EMAIL,
          password: USER_PASSWORD,
        });
        expect(response.status).toEqual(HTTP_STATUS.SuccessCreated);
        expect(response.body).toHaveProperty('token');
        const token = tokenManager.verifyToken(response.body.token) as UserInterface;
        expect(token.email).toEqual(USER_EMAIL);
        expect(token).not.haveOwnProperty('password');
      });
    });
    describe('in case of error', () => {
      afterEach(() => {
        Sinon.restore();
      });
      it('if the user tries to log into the application without being registered in the database, an error should be triggered in the application - 400', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_IN_DB);
        const response = await request(app).post('/login').send({
          email: EMAIL_NOT_REGISTERED,
          password: USER_PASSWORD,
        });
        expect(response.status).toEqual(HTTP_STATUS.ClientErrorBadRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('invalid field');
      });
      it('if the information passed in the request body is missing or contains abnormal information, an error is triggered in the application - 400', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_IN_DB);
        const response = await request(app).post('/login').send({
          sweet: 'candy',
          fruit: 'banana',
        });
        expect(response.status).toEqual(HTTP_STATUS.ClientErrorBadRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Some required fields are missing');
      });
      it('if the password is wrong and the email is registered in the database, an error is triggered in the application - 400', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_IN_DB);
        const response = await request(app).post('/login').send({
          email: USER_EMAIL,
          password: PASSWORD_NOT_REGISTERED,
        });
        expect(response.status).toEqual(HTTP_STATUS.ClientErrorBadRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('invalid field');
      });
    });
  });
});
