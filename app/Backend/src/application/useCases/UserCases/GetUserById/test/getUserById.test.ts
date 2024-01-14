import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GetUserById } from '../GetUserById';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { USER_DATABASE, USER_ID_VALID, USER_ID_INVALID } from './../../../../../domain/shared/mocks/User';

describe('GetUserById UseCase', () => {
  describe('Sequelize Type', () => {
    let getById: GetUserById;
    beforeEach(() => {
      getById = new GetUserById();
    });
    afterEach(() => {
      Sinon.restore();
    });
    describe('In case of sucess', () => {
      it('Should be possible to create a instance of GetUserById', () => {
        expect(getById).toBeInstanceOf(GetUserById);
      });
      it('If the user exists in the database, it must be possible to retrieve the respective user information through the id passed to the class execute method', async () => {
        Sinon.stub(Model, 'findByPk')
          .withArgs(USER_ID_VALID)
          .resolves({ dataValues: USER_DATABASE[0] } as Model);
        const hasUser = await getById.execute(USER_ID_VALID);
        expect(hasUser).toEqual(USER_DATABASE[0]);
        Sinon.restore();
      });
    });
    describe('In case of error', () => {
      let getById: GetUserById;
      beforeEach(() => {
        getById = new GetUserById();
      });
      it('If the provided id does not exist in the database, the method must return false indicating rejection after searching and not finding the user through the id provided to the class method', async () => {
        Sinon.stub(Model, 'findByPk')
          .withArgs(USER_ID_VALID)
          .resolves({ dataValues: USER_DATABASE[0] } as Model);
        const hasUser = await getById.execute(USER_ID_INVALID);
        expect(hasUser).toBeFalsy();
      });
    });
  });
});
