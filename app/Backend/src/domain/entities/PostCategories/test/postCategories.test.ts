import { it, describe, expect, beforeEach } from 'vitest';
import { PostCategories } from '../PostCategories';
import { CATEGORY_ID, POST_CATEGORIES_CLASS_PROPERTIES, POST_ID } from './../../../shared/mocks/Post-Categories';

describe('PostCategories Domain', () => {
  describe('In case of sucess', () => {
    let postCategorie: PostCategories;
    beforeEach(() => {
      postCategorie = new PostCategories(CATEGORY_ID, POST_ID);
    });
    it('Should be possible to create a User instance', () => {
      expect(postCategorie).toBeInstanceOf(PostCategories);
    });
    it('There must be all the correct properties in the User class', () => {
      POST_CATEGORIES_CLASS_PROPERTIES.forEach((pro) => {
        expect(postCategorie).toHaveProperty(pro);
      });
    });
  });
});
