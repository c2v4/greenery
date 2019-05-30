import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProperty } from 'app/shared/model/property.model';

type EntityResponseType = HttpResponse<IProperty>;
type EntityArrayResponseType = HttpResponse<IProperty[]>;

@Injectable({ providedIn: 'root' })
export class PropertyService {
  public resourceUrl = SERVER_API_URL + 'api/properties';

  constructor(protected http: HttpClient) {}

  create(property: IProperty): Observable<EntityResponseType> {
    return this.http.post<IProperty>(this.resourceUrl, property, { observe: 'response' });
  }

  update(property: IProperty): Observable<EntityResponseType> {
    return this.http.put<IProperty>(this.resourceUrl, property, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProperty>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProperty[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
