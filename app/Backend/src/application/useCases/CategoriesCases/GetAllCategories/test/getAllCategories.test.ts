import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GetAllCategories } from '../GetAllCategories';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { CATEGORIES_DATABASE } from './mocks/getAllCategories.mock';

describe('GetAllCategories UseCase', () => {
  describe('Sequelize Type', () => {
    let getAll: GetAllCategories;
    beforeEach(() => {
      getAll = new GetAllCategories();
    });
    afterEach(() => {
      Sinon.restore();
    });
    describe('in case of sucess', () => {
      it('should be possible to get all categories in database', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: CATEGORIES_DATABASE } as unknown as Model]);
        const allCategories = await getAll.execute();
        expect(allCategories[0]).toEqual(CATEGORIES_DATABASE);
      });
    });
  });
});
