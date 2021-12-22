jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMeasure, Measure } from '../measure.model';
import { MeasureService } from '../service/measure.service';

import { MeasureRoutingResolveService } from './measure-routing-resolve.service';

describe('Measure routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MeasureRoutingResolveService;
  let service: MeasureService;
  let resultMeasure: IMeasure | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(MeasureRoutingResolveService);
    service = TestBed.inject(MeasureService);
    resultMeasure = undefined;
  });

  describe('resolve', () => {
    it('should return IMeasure returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMeasure = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMeasure).toEqual({ id: 123 });
    });

    it('should return new IMeasure if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMeasure = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMeasure).toEqual(new Measure());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Measure })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMeasure = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMeasure).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
