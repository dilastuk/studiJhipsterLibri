import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MeasureType } from 'app/entities/enumerations/measure-type.model';
import { IMeasure, Measure } from '../measure.model';

import { MeasureService } from './measure.service';

describe('Measure Service', () => {
  let service: MeasureService;
  let httpMock: HttpTestingController;
  let elemDefault: IMeasure;
  let expectedResult: IMeasure | IMeasure[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MeasureService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      type: MeasureType.H,
      value: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Measure', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Measure()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Measure', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          type: 'BBBBBB',
          value: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Measure', () => {
      const patchObject = Object.assign(
        {
          value: 1,
        },
        new Measure()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Measure', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          type: 'BBBBBB',
          value: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Measure', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMeasureToCollectionIfMissing', () => {
      it('should add a Measure to an empty array', () => {
        const measure: IMeasure = { id: 123 };
        expectedResult = service.addMeasureToCollectionIfMissing([], measure);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(measure);
      });

      it('should not add a Measure to an array that contains it', () => {
        const measure: IMeasure = { id: 123 };
        const measureCollection: IMeasure[] = [
          {
            ...measure,
          },
          { id: 456 },
        ];
        expectedResult = service.addMeasureToCollectionIfMissing(measureCollection, measure);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Measure to an array that doesn't contain it", () => {
        const measure: IMeasure = { id: 123 };
        const measureCollection: IMeasure[] = [{ id: 456 }];
        expectedResult = service.addMeasureToCollectionIfMissing(measureCollection, measure);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(measure);
      });

      it('should add only unique Measure to an array', () => {
        const measureArray: IMeasure[] = [{ id: 123 }, { id: 456 }, { id: 86922 }];
        const measureCollection: IMeasure[] = [{ id: 123 }];
        expectedResult = service.addMeasureToCollectionIfMissing(measureCollection, ...measureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const measure: IMeasure = { id: 123 };
        const measure2: IMeasure = { id: 456 };
        expectedResult = service.addMeasureToCollectionIfMissing([], measure, measure2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(measure);
        expect(expectedResult).toContain(measure2);
      });

      it('should accept null and undefined values', () => {
        const measure: IMeasure = { id: 123 };
        expectedResult = service.addMeasureToCollectionIfMissing([], null, measure, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(measure);
      });

      it('should return initial array if no Measure is added', () => {
        const measureCollection: IMeasure[] = [{ id: 123 }];
        expectedResult = service.addMeasureToCollectionIfMissing(measureCollection, undefined, null);
        expect(expectedResult).toEqual(measureCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
