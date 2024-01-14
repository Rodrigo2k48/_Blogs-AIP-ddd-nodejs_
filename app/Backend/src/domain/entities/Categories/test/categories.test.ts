import { it, describe, expect, beforeEach } from 'vitest';
import { Categories } from '../Categories';
import { NEW_CATEGORY, CATEGORY_CLASS_PROPERTIES } from './../../../shared/mocks/Category/index';

describe('Categories Domain', () => {
  describe('In case of sucess', () => {
    let categorie: Categories;
    beforeEach(() => {
      categorie = new Categories(NEW_CATEGORY);
    });
    it('Should be possible to create a Categories instance', () => {
      expect(categorie).toBeInstanceOf(Categories);
    });
    it('There must be all the correct proerties in the Blog Posts class', () => {
      CATEGORY_CLASS_PROPERTIES.forEach((pro) => {
        expect(categorie).toHaveProperty(pro);
      });
    });
  });
});
