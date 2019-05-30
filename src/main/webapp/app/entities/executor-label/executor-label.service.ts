import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExecutorLabel } from 'app/shared/model/executor-label.model';

type EntityResponseType = HttpResponse<IExecutorLabel>;
type EntityArrayResponseType = HttpResponse<IExecutorLabel[]>;

@Injectable({ providedIn: 'root' })
export class ExecutorLabelService {
  public resourceUrl = SERVER_API_URL + 'api/executor-labels';

  constructor(protected http: HttpClient) {}

  create(executorLabel: IExecutorLabel): Observable<EntityResponseType> {
    return this.http.post<IExecutorLabel>(this.resourceUrl, executorLabel, { observe: 'response' });
  }

  update(executorLabel: IExecutorLabel): Observable<EntityResponseType> {
    return this.http.put<IExecutorLabel>(this.resourceUrl, executorLabel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExecutorLabel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExecutorLabel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
