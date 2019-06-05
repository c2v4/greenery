import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchedulerType } from 'app/shared/model/scheduler-type.model';

type EntityResponseType = HttpResponse<ISchedulerType>;
type EntityArrayResponseType = HttpResponse<ISchedulerType[]>;

@Injectable({ providedIn: 'root' })
export class SchedulerTypeService {
  public resourceUrl = SERVER_API_URL + 'api/scheduler-types';

  constructor(protected http: HttpClient) {}

  create(schedulerType: ISchedulerType): Observable<EntityResponseType> {
    return this.http.post<ISchedulerType>(this.resourceUrl, schedulerType, { observe: 'response' });
  }

  update(schedulerType: ISchedulerType): Observable<EntityResponseType> {
    return this.http.put<ISchedulerType>(this.resourceUrl, schedulerType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISchedulerType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISchedulerType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
