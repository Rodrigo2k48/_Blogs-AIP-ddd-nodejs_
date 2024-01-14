import Sinon from 'sinon';
import { CreateUser } from '../CreateUser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NEW_USER, USER_CLASS_PROPERTIES } from '../../../../../domain/shared/mocks/User';
import { Model } from 'sequelize';

describe('CreateUser Usecase', () => {
  describe('Sequelize Type', () => {
    let create: CreateUser;
    beforeEach(() => {
      create = new CreateUser();
    });
    afterEach(() => {
      Sinon.restore();
    });
    describe('In case of success', () => {
      it('Should be possible to create an instance of CreateUser', () => {
        expect(create).toBeInstanceOf(CreateUser);
      });
      it('Shoud be possible to create an new user in database', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([{ dataValues: NEW_USER } as unknown as Model, true]);
        const newUser = await create.execute(NEW_USER);
        USER_CLASS_PROPERTIES.forEach((property) => {
          expect(newUser).toHaveProperty(property);
        });
      });
    });
    describe('In case of error', () => {
      it('If the user is already registered in the database, the method must return false, indicating the rejection of registering a duplicate of the same user', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([{ dataValues: NEW_USER } as unknown as Model, false]);
        const newUser = await create.execute(NEW_USER);
        expect(newUser).toBeFalsy();
      });
    });
  });
});
