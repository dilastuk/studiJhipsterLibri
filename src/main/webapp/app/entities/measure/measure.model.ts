import { IBook } from 'app/entities/book/book.model';
import { MeasureType } from 'app/entities/enumerations/measure-type.model';

export interface IMeasure {
  id?: number;
  type?: MeasureType | null;
  value?: number | null;
  book?: IBook | null;
}

export class Measure implements IMeasure {
  constructor(public id?: number, public type?: MeasureType | null, public value?: number | null, public book?: IBook | null) {}
}

export function getMeasureIdentifier(measure: IMeasure): number | undefined {
  return measure.id;
}
