import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMeasure, Measure } from '../measure.model';
import { MeasureService } from '../service/measure.service';

@Injectable({ providedIn: 'root' })
export class MeasureRoutingResolveService implements Resolve<IMeasure> {
  constructor(protected service: MeasureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMeasure> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((measure: HttpResponse<Measure>) => {
          if (measure.body) {
            return of(measure.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Measure());
  }
}
