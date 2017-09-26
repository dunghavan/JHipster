import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { FirstEntityMySuffix } from './first-entity-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FirstEntityMySuffixService {

    private resourceUrl = 'api/first-entities';

    constructor(private http: Http) { }

    create(firstEntity: FirstEntityMySuffix): Observable<FirstEntityMySuffix> {
        const copy = this.convert(firstEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(firstEntity: FirstEntityMySuffix): Observable<FirstEntityMySuffix> {
        const copy = this.convert(firstEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<FirstEntityMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(firstEntity: FirstEntityMySuffix): FirstEntityMySuffix {
        const copy: FirstEntityMySuffix = Object.assign({}, firstEntity);
        return copy;
    }
}
