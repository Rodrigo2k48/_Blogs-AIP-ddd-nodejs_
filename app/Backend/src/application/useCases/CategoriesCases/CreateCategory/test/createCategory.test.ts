import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CreateCategory } from '../CreateCategory';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { CATEGORY_MOCK } from './mocks/createCategory.mock';

describe('CreateCategory UseCase', () => {
  describe('Sequelize Type', () => {
    let create: CreateCategory;
    beforeEach(() => {
      create = new CreateCategory();
    });
    afterEach(() => {
      Sinon.restore();
    });
    describe('in case of sucess', () => {
      it('should be possible to create a new Category', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([
          {
            dataValues: CATEGORY_MOCK,
          } as unknown as Model,
          true,
        ]);
        const newCategory = await create.execute(CATEGORY_MOCK.categoryName);
        expect(newCategory).toHaveProperty('id');
        expect(newCategory).toHaveProperty('categoryName');
      });
    });
    describe('in case of error', () => {
      it('if the category is already registered in the database, the method must return false, indicanting the rejection of registering a duplicate of the same category', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([
          {
            dataValues: null,
          } as unknown as Model,
          false,
        ]);
        const newCategory = await create.execute(CATEGORY_MOCK.categoryName);
        expect(newCategory).toBeFalsy();
      });
    });
  });
});
