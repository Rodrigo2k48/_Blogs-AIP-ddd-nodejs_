import BadRequest from '../../error/typeErros/BadRequest';

interface BlogPostsInterface {
  id?: number;
  titlePost: string;
  contentPost: string;
  userId: number;
}

export class BlogPosts implements BlogPostsInterface {
  private readonly _id?: number;
  private _titlePost: string;
  private _contentPost: string;
  private _userId: number;

  constructor(userId: number, titlePost: string, content: string) {
    this._userId = userId;
    this._titlePost = titlePost;
    this._contentPost = content;
  }

  get id(): number | undefined {
    return this._id;
  }
  get userId(): number {
    return this._userId;
  }
  get titlePost(): string {
    return this._titlePost;
  }
  set titlePost(value: string) {
    if (this._titlePost === value) {
      throw new BadRequest('Please provide a different title, as the one you suggested has already been established.'
      );
    }
    this._titlePost = value;
  }
  get contentPost(): string {
    return this._contentPost;
  }
  set contentPost(value: string) {
    if(this._contentPost === value) {
      throw new BadRequest('Please provide a different content for the post as what you suggested has already been established.'
      );
    }
    this._contentPost = value;
  }
  
}
