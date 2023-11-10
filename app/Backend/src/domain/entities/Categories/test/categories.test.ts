import { it, describe, expect, beforeEach } from 'vitest';
import { Categories } from '../Categories';
import { CATEGORY, CLASS_PROPERTIES } from './mocks/categories.mock';

describe('Categories Domain', () => {
  describe('in case of sucess', () => {
    let categorie: Categories;
    beforeEach(() => {
      categorie = new Categories(CATEGORY);
    });
    it('should be possible to create a Categories instance', () => {
      expect(categorie).toBeInstanceOf(Categories);
    });
    it('there must be all the correct proerties in the Blog Posts class', () => {
      CLASS_PROPERTIES.forEach((pro) => {
        expect(categorie).toHaveProperty(pro);
      });
    });
  });
});
