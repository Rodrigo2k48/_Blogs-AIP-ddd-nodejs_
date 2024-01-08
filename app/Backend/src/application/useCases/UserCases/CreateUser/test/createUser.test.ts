import Sinon from 'sinon';
import { CreateUser } from '../CreateUser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { USER_IN_DB } from '../test/mocks/createUser.mock';
import { Model } from 'sequelize';
import { UserInterface } from '../../../../../domain/entities/User/User';

describe('CreateUser Usecase', () => {
  describe('Sequelize Type', () => {
    describe('in case of sucess', () => {
      let create: CreateUser;
      beforeEach(() => {
        create = new CreateUser();
      });
      afterEach(() => {
        Sinon.restore();
      });
      it('should be possible to create an instance of CreateUser', () => {
        expect(create).toBeInstanceOf(CreateUser);
      });
      it('shoud be possible to create an new user in database', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([{ dataValues: USER_IN_DB } as unknown as Model, true]);
        const newUser = (await create.execute(USER_IN_DB)) as UserInterface;
        expect(newUser).toHaveProperty('email');
        expect(newUser).toHaveProperty('password');
        expect(newUser).toHaveProperty('userName');
        expect(newUser).toHaveProperty('image');
        expect(newUser).toHaveProperty('id');
      });
    });
    describe('in case of error', () => {
      let create: CreateUser;
      beforeEach(() => {
        create = new CreateUser();
      });
      afterEach(() => {
        Sinon.restore();
      });
      it('if the user is already registered in the database, the function must return false, indicating the rejection of registering a duplicate of the same user', async () => {
        Sinon.stub(Model, 'findOrCreate').resolves([{ dataValues: USER_IN_DB } as unknown as Model, false]);
        const newUser = await create.execute(USER_IN_DB);
        expect(newUser).toBeFalsy;
      });
    });
  });
});
