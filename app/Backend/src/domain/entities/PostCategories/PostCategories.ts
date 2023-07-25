interface PostCaregoriesInterface {
  categoryId: number[];
  postId: number;
}

export class PostCategories implements PostCaregoriesInterface {
  private _categoryId: number[];
  private _postId: number;

  constructor(categoryId: number[], postId: number) {
    this._categoryId = categoryId;
    this._postId = postId; 
  }

  get categoryId(): number[] {
    return this._categoryId;
  }
  get postId(): number {
    return this._postId;
  }

}