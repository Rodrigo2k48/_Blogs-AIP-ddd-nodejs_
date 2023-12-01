import { beforeEach, describe, expect, it } from 'vitest';
import { FindUserByEmail } from '../FindUserByEmail';
import Sinon from 'sinon';
import { EMAIL_INVALID, EMAIL_VALID, PASSWORD_HASH_MOCK, USER_IN_DATABASE_VALID, USER_MOCK } from './mocks/findUserByEmail.mock';
import { Model } from 'sequelize';
import { User } from '../../../../domain/entities/User/User';
// import { User } from '../../../../domain/entities/User/User';

describe('FindUserByEmail Usecase', () => {
  describe('Sequelize Type', () => {
    describe('in case of sucess', () => {
      let findUser: FindUserByEmail;
      beforeEach(() => {
        findUser = new FindUserByEmail();
      });
      it('it should be possible to create an instance of FindUserByEmail', () => {
        expect(findUser).toBeInstanceOf(FindUserByEmail);
      });
      it('it must be possible to search the database, the user passed as a parameter in the execute method of the class', async () => {
        Sinon.stub(Model, 'findOne').resolves({dataValues: USER_IN_DATABASE_VALID} as Model);
        Sinon.stub(USER_MOCK, 'password').returns(PASSWORD_HASH_MOCK);
        const hasUser = await findUser.execute(EMAIL_VALID) as User;
        expect(hasUser.email).toEqual(EMAIL_VALID);
        expect(hasUser.passMethods().value).toEqual(USER_IN_DATABASE_VALID.password);
        expect(hasUser.userName).toEqual(USER_IN_DATABASE_VALID.user_name);
        expect(hasUser.image).toEqual(USER_IN_DATABASE_VALID.image);
        expect(hasUser.id).toEqual(USER_IN_DATABASE_VALID.id);
        Sinon.restore();
      });
    });
    describe('in case of error', () => {
      let findUser: FindUserByEmail;
      beforeEach(() => {
        findUser = new FindUserByEmail();
      });
      it('If the email provided is not registered in the database, the method must return false', async () => {
        Sinon.stub(Model, 'findOne').resolves(null);
        const hasUser = await findUser.execute(EMAIL_INVALID);
        expect(hasUser).toBeFalsy;
        Sinon.restore();
      });
    });
  });
});
