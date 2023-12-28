import { beforeEach, describe, expect, it } from 'vitest';
import { GetAllUsers } from '../GetAllUsers';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { DATABASE_MOCK } from './mocks/getAllUsers.mock';

describe('GetAllUsers UseCase', () => {
  describe('Sequelize Type', () => {
    describe('in case of sucess', () => {
      let getAll: GetAllUsers;
      beforeEach(() => {
        getAll = new GetAllUsers();
      });
      it('should be possible to create an instance of GetAllUsers', () => {
        expect(getAll).toBeInstanceOf(GetAllUsers);
      });
      it('If there are users registered in the database, it must be possible to return an array with all users available in the database', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: DATABASE_MOCK } as Model]);
        const dataBase = await getAll.execute();
        expect(dataBase[0]).not.toHaveLength(0);
        expect(dataBase[0]).toHaveLength(3);
        expect(dataBase[0]).toEqual(DATABASE_MOCK);
      });
    });
  });
});
