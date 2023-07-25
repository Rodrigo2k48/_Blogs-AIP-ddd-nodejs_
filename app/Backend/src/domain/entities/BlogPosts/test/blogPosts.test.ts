import {expect, it, describe, beforeEach} from 'vitest';
import { BlogPosts } from '../BlogPosts';
import { CLASS_PROPERTIES, CONTENT, TITLE, USER_ID } from './mocks/blogPosts.mock';

describe('BlogPosts Domain', () => {
  describe('in case of success', () => {
    let blogPost: BlogPosts;
    beforeEach(() => {
      blogPost = new BlogPosts(USER_ID, TITLE, CONTENT);
    });
    it('should be possible to create a Blog Posts Instance', () => {
      expect(blogPost).toBeInstanceOf(BlogPosts);
    });
    it('there must be all the correct proerties in the Blog Posts class', () => {
      CLASS_PROPERTIES.forEach((pro) => {
        expect(blogPost).toHaveProperty(pro);
      });
    });
  });
});