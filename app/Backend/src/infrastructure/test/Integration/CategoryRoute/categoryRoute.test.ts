import { Model } from 'sequelize';
import Sinon from 'sinon';
import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { CATEGORIES_DATABASE, CATEGORIE_INPUT, TOKEN_VALID } from './mocks/categories.mock';
import { App } from '../../../../application/webService/app';
import HTTP_STATUS from '../../../../domain/error/httpStatusCode';

describe('application Categories route', () => {
  const app = new App().app;
  describe('/categories - GET', () => {
    afterEach(() => {
      Sinon.restore();
    });
    describe('in case of success', () => {
      it('if the user has a valid token, it must be possible to redeem all categories available in the application database - 200', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: CATEGORIES_DATABASE } as unknown as Model]);
        const response = await request(app).get('/categories').set({
          Authorization: TOKEN_VALID,
        });
        expect(response.status).toEqual(HTTP_STATUS.SuccessOK);
      });
    });
    describe('in case of database error', async () => {
      it('', async () => {
        Sinon.stub(Model, 'findAll').throwsException('dataBase Error');
        const response = await request(app).get('/categories').set({
          Authorization: TOKEN_VALID,
        });
        expect(response.status).toBe(HTTP_STATUS.InternalServerError);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Sinon-provided dataBase Error');
      });
    });
  });
  describe('/categories - POST', () => {
    afterEach(() => {
      Sinon.restore();
    });
    describe('in case of success', () => {
      it('if everything is ok regarding validation, it should be possible to register a new category to the database', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([
          {
            dataValues: CATEGORIE_INPUT,
          } as unknown as Model,
          true,
        ]);
        const response = await request(app)
          .post('/categories')
          .set({
            Authorization: TOKEN_VALID,
          })
          .send({
            name: CATEGORIE_INPUT.categoryName,
          });
        expect(response.body).toEqual(CATEGORIE_INPUT);
      });
    });
    describe('in case of error', () => {
      it('If you try to register a new category that already exists in the database, an error is triggered in the application', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([
          {
            dataValues: CATEGORIE_INPUT,
          } as unknown as Model,
          false,
        ]);
        const response = await request(app)
          .post('/categories')
          .set({
            Authorization: TOKEN_VALID,
          })
          .send({
            name: CATEGORIE_INPUT.categoryName,
          });
        console.log(response);

        expect(response.body).toHaveProperty('message');
        expect(response.status).toEqual(HTTP_STATUS.ConflictError);
        expect(response.body.message).toEqual('Category already exists');
      });
    });
  });
});
