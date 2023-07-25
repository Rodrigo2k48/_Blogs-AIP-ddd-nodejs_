import { it, describe, expect, beforeEach } from 'vitest';
import { PostCategories } from '../PostCategories';
import { CATEGORY_ID, CLASS_PROPERTIES, POST_ID } from './mocks/postCategories.mock';

describe('PostCategories Domain', () => {
  describe('in case of sucess', () => {
    let postCategorie: PostCategories;
    beforeEach(() => {
      postCategorie = new PostCategories(CATEGORY_ID, POST_ID);
    });
    it('should be possible to create a User instance', () => {
      expect(postCategorie).toBeInstanceOf(PostCategories);
    });
    it('there must be all the correct properties in the User class', () => {
      CLASS_PROPERTIES.forEach((pro) => {
        expect(postCategorie).toHaveProperty(pro); 
      });
    });
  });
});
