import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRule } from 'app/shared/model/rule.model';

type EntityResponseType = HttpResponse<IRule>;
type EntityArrayResponseType = HttpResponse<IRule[]>;

@Injectable({ providedIn: 'root' })
export class RuleService {
  public resourceUrl = SERVER_API_URL + 'api/rules';

  constructor(protected http: HttpClient) {}

  create(rule: IRule): Observable<EntityResponseType> {
    return this.http.post<IRule>(this.resourceUrl, rule, { observe: 'response' });
  }

  update(rule: IRule): Observable<EntityResponseType> {
    return this.http.put<IRule>(this.resourceUrl, rule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
