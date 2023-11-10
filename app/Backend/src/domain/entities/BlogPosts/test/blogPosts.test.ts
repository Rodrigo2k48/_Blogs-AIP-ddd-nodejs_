import { expect, it, describe, beforeEach } from 'vitest';
import { BlogPosts } from '../BlogPosts';
import { CLASS_PROPERTIES, CONTENT, OTHER_CONTENT, OTHER_TITLE, TITLE, USER_ID } from './mocks/blogPosts.mock';

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
    it('It should be possible to modify the post title', () => {
      expect(blogPost.titlePost).toEqual(TITLE);
      blogPost.titlePost = OTHER_TITLE;
      expect(blogPost.titlePost).toEqual(OTHER_TITLE);
    });
    it('It should be possible to modify the content post', () => {
      expect(blogPost.contentPost).toEqual(CONTENT);
      blogPost.contentPost = OTHER_CONTENT;
      expect(blogPost.contentPost).toEqual(OTHER_CONTENT);
    });
  });
  describe('in case of error', () => {
    it('should throw an error if the new title of the post passed to replace the previous one is exactly the same as the already established title', () => {
      const blogPost = new BlogPosts(USER_ID, TITLE, CONTENT);
      expect(blogPost.titlePost).toEqual(TITLE);
      expect(() => (blogPost.titlePost = TITLE)).toThrowError('Please provide a different title, as the one you suggested has already been established.');
    });
    it('should throw an error if the new content of the post passed to replace the previous one is exactly the same as the already established content', () => {
      const blogPost = new BlogPosts(USER_ID, TITLE, CONTENT);
      expect(blogPost.contentPost).toEqual(CONTENT);
      expect(() => (blogPost.contentPost = CONTENT)).toThrowError('Please provide a different content for the post as what you suggested has already been established.');
    });
  });
});
