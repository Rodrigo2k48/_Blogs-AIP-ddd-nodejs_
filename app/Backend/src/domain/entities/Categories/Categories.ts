export interface CategoriesInterface {
  id?: number;
  categoryName: string;
}

export class Categories implements CategoriesInterface {
  private readonly _id?: number;
  private _categoryName: string;

  constructor(categoryName: string) {
    this._categoryName = categoryName;
  }

  get id(): number | undefined {
    return this._id;
  }
  get categoryName(): string {
    return this._categoryName;
  }
}
