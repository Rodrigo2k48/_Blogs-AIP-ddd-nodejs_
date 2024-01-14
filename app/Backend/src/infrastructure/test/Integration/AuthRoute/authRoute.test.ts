import { it, describe, expect, afterEach } from 'vitest';
import request from 'supertest';
import { App } from '../../../../application/webService/app';
import Sinon from 'sinon';
import { PASSWORD_NOT_REGISTERED, EMAIL_NOT_REGISTERED, USER_EMAIL, USER_PASSWORD, USER_OUTPUT } from '../../../../domain/shared/mocks/User/index';
import { FindUserByEmail } from '../../../../application/useCases/UserCases/FindUserByEmail/FindUserByEmail';
import { TokenManager } from '../../../../domain/entities/Token/TokenManager';
import { UserInterface } from '../../../../domain/entities/User/User';
import HTTP_STATUS from '../../../../domain/error/httpStatusCode';

describe('Application authentication route', () => {
  describe('/login - POST', async () => {
    const app = new App().app;
    const tokenManager = new TokenManager();
    afterEach(() => {
      Sinon.restore();
    });
    describe('In case of success', () => {
      it('If the user is registered in the database, a token must be returned with the data of that respective user - 200', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_OUTPUT);
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
    describe('In case of error', () => {
      it('If the user tries to log into the application without being registered in the database, an error should be triggered in the application - 400', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_OUTPUT);
        const response = await request(app).post('/login').send({
          email: EMAIL_NOT_REGISTERED,
          password: USER_PASSWORD,
        });
        expect(response.status).toEqual(HTTP_STATUS.ClientErrorBadRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('invalid field.');
      });
      it('If the password is wrong and the email is registered in the database, an error is triggered in the application - 400', async () => {
        Sinon.stub(FindUserByEmail.prototype, 'execute').withArgs(USER_EMAIL).resolves(USER_OUTPUT);
        const response = await request(app).post('/login').send({
          email: USER_EMAIL,
          password: PASSWORD_NOT_REGISTERED,
        });
        expect(response.status).toEqual(HTTP_STATUS.ClientErrorBadRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('invalid field.');
      });
    });
  });
});
