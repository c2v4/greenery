import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INumeric } from 'app/shared/model/numeric.model';

type EntityResponseType = HttpResponse<INumeric>;
type EntityArrayResponseType = HttpResponse<INumeric[]>;

@Injectable({ providedIn: 'root' })
export class NumericService {
  public resourceUrl = SERVER_API_URL + 'api/numerics';

  constructor(protected http: HttpClient) {}

  create(numeric: INumeric): Observable<EntityResponseType> {
    return this.http.post<INumeric>(this.resourceUrl, numeric, { observe: 'response' });
  }

  update(numeric: INumeric): Observable<EntityResponseType> {
    return this.http.put<INumeric>(this.resourceUrl, numeric, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INumeric>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INumeric[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
