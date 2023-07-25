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
  get titlePost(): string {
    return this._titlePost;
  }
  get contentPost(): string {
    return this._contentPost;
  }
  get userId(): number {
    return this._userId;
  }
}
