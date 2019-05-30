import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';

type EntityResponseType = HttpResponse<ISchedulerConfig>;
type EntityArrayResponseType = HttpResponse<ISchedulerConfig[]>;

@Injectable({ providedIn: 'root' })
export class SchedulerConfigService {
  public resourceUrl = SERVER_API_URL + 'api/scheduler-configs';

  constructor(protected http: HttpClient) {}

  create(schedulerConfig: ISchedulerConfig): Observable<EntityResponseType> {
    return this.http.post<ISchedulerConfig>(this.resourceUrl, schedulerConfig, { observe: 'response' });
  }

  update(schedulerConfig: ISchedulerConfig): Observable<EntityResponseType> {
    return this.http.put<ISchedulerConfig>(this.resourceUrl, schedulerConfig, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISchedulerConfig>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISchedulerConfig[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
