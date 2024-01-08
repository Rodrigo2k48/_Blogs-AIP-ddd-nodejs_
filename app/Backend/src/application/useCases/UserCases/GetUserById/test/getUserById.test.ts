import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserById } from '../GetUserById';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { USER_IN_DB } from './mocks/getUserById.mock';

describe('GetUserById UseCase', () => {
  describe('Sequelize Type', () => {
    describe('in case of sucess', () => {
      let getById: GetUserById;
      beforeEach(() => {
        getById = new GetUserById();
      });
      it('should be possible to create a instance of GetUserById', () => {
        expect(getById).toBeInstanceOf(GetUserById);
      });
      it('if the user exists in the database, it must be possible to retrieve the respective user information through their ID ', async () => {
        Sinon.stub(Model, 'findByPk').resolves({ dataValues: USER_IN_DB } as Model);
        const hasUser = await getById.execute(1);
        expect(hasUser).toEqual(USER_IN_DB);
        Sinon.restore();
      });
    });
    describe('in case of error', () => {
      let getById: GetUserById;
      beforeEach(() => {
        getById = new GetUserById();
      });
      it('if the provided id does not exist in the database, the method must return null', async () => {
        Sinon.stub(Model, 'findByPk').resolves(null);
        const hasUser = await getById.execute(1);
        expect(hasUser).toBeNull();
      });
    });
  });
});
