import { IAuthor } from 'app/entities/author/author.model';
import { IMeasure } from 'app/entities/measure/measure.model';

export interface IBook {
  id?: number;
  name?: string | null;
  desc?: string | null;
  author?: IAuthor | null;
  dims?: IMeasure[] | null;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public name?: string | null,
    public desc?: string | null,
    public author?: IAuthor | null,
    public dims?: IMeasure[] | null
  ) {}
}

export function getBookIdentifier(book: IBook): number | undefined {
  return book.id;
}
