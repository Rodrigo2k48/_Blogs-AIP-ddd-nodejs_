import { beforeEach, describe, expect, it } from 'vitest';
import { GetAllUsers } from '../GetAllUsers';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { USER_DATABASE } from './../../../../../domain/shared/mocks/User';

describe('GetAllUsers UseCase', () => {
  describe('Sequelize Type', () => {
    describe('In case of sucess', () => {
      let getAll: GetAllUsers;
      beforeEach(() => {
        getAll = new GetAllUsers();
      });
      it('Should be possible to create an instance of GetAllUsers', () => {
        expect(getAll).toBeInstanceOf(GetAllUsers);
      });
      it('If there are users registered in the database, it must be possible to return an array with all users available in the database', async () => {
        Sinon.stub(Model, 'findAll').resolves([{ dataValues: USER_DATABASE } as Model]);
        const dataBase = await getAll.execute();
        expect(dataBase[0]).toEqual(USER_DATABASE);
      });
    });
  });
});
