import { UserInterface } from './../../../../../domain/entities/User/User';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FindUserByEmail } from '../FindUserByEmail';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { EMAIL_INVALID, USER_DATABASE } from '../../../../../domain/shared/mocks/User';

describe('FindUserByEmail Usecase', () => {
  describe('Sequelize Type', () => {
    let findUser: FindUserByEmail;
    beforeEach(() => {
      findUser = new FindUserByEmail();
    });
    afterEach(() => {
      Sinon.restore();
    });
    describe('In case of sucess', () => {
      it('Should be possible to create an instance of FindUserByEmail', () => {
        expect(findUser).toBeInstanceOf(FindUserByEmail);
      });
      it('Must be possible to search the database, the user passed as a parameter in the execute method of the class', async () => {
        Sinon.stub(Model, 'findOne')
          .withArgs({
            where: { email: USER_DATABASE[0].email },
          })
          .resolves({ dataValues: USER_DATABASE[0] } as Model);
        const hasUser = (await findUser.execute(USER_DATABASE[0].email)) as UserInterface;
        [hasUser].forEach((user) => {
          expect(Object.keys(user)).toEqual(Object.keys(USER_DATABASE[0]));
        });
        expect(Object.keys(hasUser).length).toEqual(5);
      });
    });
    describe('In case of error', () => {
      it('If the email provided is not registered in the database, indicating rejection after searching and not finding the user via the email provided to the class method', async () => {
        Sinon.stub(Model, 'findOne').resolves(null);
        const hasUser = await findUser.execute(EMAIL_INVALID);
        expect(hasUser).toBeFalsy();
      });
    });
  });
});
