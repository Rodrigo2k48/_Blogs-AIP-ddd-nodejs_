import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CreateCategory } from '../CreateCategory';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { CATEGORIES_DATABASE, CATEGORIE_INPUT, CATEGORY_CLASS_PROPERTIES } from './../../../../../domain/shared/mocks/Category/index';

describe('CreateCategory UseCase', () => {
  describe('Sequelize Type', () => {
    let create: CreateCategory;
    beforeEach(() => {
      create = new CreateCategory();
    });
    afterEach(() => {
      Sinon.restore();
    });
    describe('In case of sucess', () => {
      it('Should be possible to create an instance of CreateCategory', () => {
        expect(create).toBeInstanceOf(CreateCategory);
      });
      it('Should be possible to create a new category', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([
          {
            dataValues: CATEGORIE_INPUT,
          } as unknown as Model,
          true,
        ]);
        const newCategory = await create.execute(CATEGORIE_INPUT.categoryName);
        CATEGORY_CLASS_PROPERTIES.forEach((property) => {
          expect(newCategory).toHaveProperty(property);
        });
      });
    });
    describe('In case of error', () => {
      it('If the category is already registered in the database, the method must return false, indicanting the rejection of registering a duplicate of the same category', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([
          {
            dataValues: null,
          } as unknown as Model,
          false,
        ]);
        const newCategory = await create.execute(CATEGORIES_DATABASE[0].categoryName);
        expect(newCategory).toBeFalsy();
      });
    });
  });
});
