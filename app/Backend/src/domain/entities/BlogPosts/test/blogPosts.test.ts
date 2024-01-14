import { expect, it, describe, beforeEach } from 'vitest';
import { BlogPosts } from '../BlogPosts';
import { BLOG_POST_CLASS_PROPERTIES, CONTENT, OTHER_CONTENT, OTHER_TITLE, TITLE, BLOG_POST_USER_ID } from '../../../shared/mocks/Blog-Posts';

describe('BlogPosts Domain', () => {
  let blogPost: BlogPosts;
  beforeEach(() => {
    blogPost = new BlogPosts(BLOG_POST_USER_ID, TITLE, CONTENT);
  });
  describe('In case of success', () => {
    it('Should be possible to create a Blog Posts Instance', () => {
      expect(blogPost).toBeInstanceOf(BlogPosts);
    });
    it('There must be all the correct proerties in the Blog Posts class', () => {
      BLOG_POST_CLASS_PROPERTIES.forEach((pro) => {
        expect(blogPost).toHaveProperty(pro);
      });
    });
    it('Should be possible to modify the post title', () => {
      expect(blogPost.titlePost).toEqual(TITLE);
      blogPost.titlePost = OTHER_TITLE;
      expect(blogPost.titlePost).toEqual(OTHER_TITLE);
    });
    it('Should be possible to modify the content post', () => {
      expect(blogPost.contentPost).toEqual(CONTENT);
      blogPost.contentPost = OTHER_CONTENT;
      expect(blogPost.contentPost).toEqual(OTHER_CONTENT);
    });
  });
  describe('In case of error', () => {
    it('Should throw an error if the new title of the post passed to replace the previous one is exactly the same as the already established title', () => {
      expect(blogPost.titlePost).toEqual(TITLE);
      expect(() => (blogPost.titlePost = TITLE)).toThrowError('Please provide a different title, as the one you suggested has already been established.');
    });
    it('Should throw an error if the new content of the post passed to replace the previous one is exactly the same as the already established content', () => {
      expect(blogPost.contentPost).toEqual(CONTENT);
      expect(() => (blogPost.contentPost = CONTENT)).toThrowError('Please provide a different content for the post as what you suggested has already been established.');
    });
  });
});
