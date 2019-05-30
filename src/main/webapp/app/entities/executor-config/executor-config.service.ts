import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExecutorConfig } from 'app/shared/model/executor-config.model';

type EntityResponseType = HttpResponse<IExecutorConfig>;
type EntityArrayResponseType = HttpResponse<IExecutorConfig[]>;

@Injectable({ providedIn: 'root' })
export class ExecutorConfigService {
  public resourceUrl = SERVER_API_URL + 'api/executor-configs';

  constructor(protected http: HttpClient) {}

  create(executorConfig: IExecutorConfig): Observable<EntityResponseType> {
    return this.http.post<IExecutorConfig>(this.resourceUrl, executorConfig, { observe: 'response' });
  }

  update(executorConfig: IExecutorConfig): Observable<EntityResponseType> {
    return this.http.put<IExecutorConfig>(this.resourceUrl, executorConfig, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExecutorConfig>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExecutorConfig[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
