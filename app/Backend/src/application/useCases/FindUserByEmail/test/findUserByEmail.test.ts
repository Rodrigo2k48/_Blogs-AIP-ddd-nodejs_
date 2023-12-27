import { beforeEach, describe, expect, it } from 'vitest';
import { FindUserByEmail } from '../FindUserByEmail';
import Sinon from 'sinon';
import { EMAIL_INVALID, EMAIL_VALID, USER_IN_DATABASE_VALID } from './mocks/findUserByEmail.mock';
import { Model } from 'sequelize';
import { UserZod } from '../../../validation/zod/schemas/zodTypes';

describe('FindUserByEmail Usecase', () => {
  describe('Sequelize Type', () => {
    describe('in case of sucess', () => {
      let findUser: FindUserByEmail;
      beforeEach(() => {
        findUser = new FindUserByEmail();
      });
      it('should be possible to create an instance of FindUserByEmail', () => {
        expect(findUser).toBeInstanceOf(FindUserByEmail);
      });
      it('must be possible to search the database, the user passed as a parameter in the execute method of the class', async () => {
        Sinon.stub(Model, 'findOne').resolves({ dataValues: USER_IN_DATABASE_VALID } as Model);
        const hasUser = (await findUser.execute(EMAIL_VALID)) as UserZod;
        expect(hasUser.email).toEqual(EMAIL_VALID);
        expect(hasUser.password).toEqual(USER_IN_DATABASE_VALID.password);
        expect(hasUser.user_name).toEqual(USER_IN_DATABASE_VALID.user_name);
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
