import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExecutorType } from 'app/shared/model/executor-type.model';

type EntityResponseType = HttpResponse<IExecutorType>;
type EntityArrayResponseType = HttpResponse<IExecutorType[]>;

@Injectable({ providedIn: 'root' })
export class ExecutorTypeService {
  public resourceUrl = SERVER_API_URL + 'api/executor-types';

  constructor(protected http: HttpClient) {}

  create(executorType: IExecutorType): Observable<EntityResponseType> {
    return this.http.post<IExecutorType>(this.resourceUrl, executorType, { observe: 'response' });
  }

  update(executorType: IExecutorType): Observable<EntityResponseType> {
    return this.http.put<IExecutorType>(this.resourceUrl, executorType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExecutorType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExecutorType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
