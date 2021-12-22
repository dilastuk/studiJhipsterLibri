import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMeasure, getMeasureIdentifier } from '../measure.model';

export type EntityResponseType = HttpResponse<IMeasure>;
export type EntityArrayResponseType = HttpResponse<IMeasure[]>;

@Injectable({ providedIn: 'root' })
export class MeasureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/measures');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(measure: IMeasure): Observable<EntityResponseType> {
    return this.http.post<IMeasure>(this.resourceUrl, measure, { observe: 'response' });
  }

  update(measure: IMeasure): Observable<EntityResponseType> {
    return this.http.put<IMeasure>(`${this.resourceUrl}/${getMeasureIdentifier(measure) as number}`, measure, { observe: 'response' });
  }

  partialUpdate(measure: IMeasure): Observable<EntityResponseType> {
    return this.http.patch<IMeasure>(`${this.resourceUrl}/${getMeasureIdentifier(measure) as number}`, measure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMeasure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMeasure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMeasureToCollectionIfMissing(measureCollection: IMeasure[], ...measuresToCheck: (IMeasure | null | undefined)[]): IMeasure[] {
    const measures: IMeasure[] = measuresToCheck.filter(isPresent);
    if (measures.length > 0) {
      const measureCollectionIdentifiers = measureCollection.map(measureItem => getMeasureIdentifier(measureItem)!);
      const measuresToAdd = measures.filter(measureItem => {
        const measureIdentifier = getMeasureIdentifier(measureItem);
        if (measureIdentifier == null || measureCollectionIdentifiers.includes(measureIdentifier)) {
          return false;
        }
        measureCollectionIdentifiers.push(measureIdentifier);
        return true;
      });
      return [...measuresToAdd, ...measureCollection];
    }
    return measureCollection;
  }
}
