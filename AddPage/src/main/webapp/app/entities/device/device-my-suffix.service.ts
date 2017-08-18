import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DeviceMySuffix } from './device-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DeviceMySuffixService {

    private resourceUrl = 'api/devices';

    constructor(private http: Http) { }

    create(device: DeviceMySuffix): Observable<DeviceMySuffix> {
        const copy = this.convert(device);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            console.log('create---res: ', res);
            return res.json();
        });
    }

    //@Dung
    findByUserId (id: number): Observable<DeviceMySuffix> {
        const copy = this.convert(id);
        this.resourceUrl = 'api/devices/findByUserId';
        return this.http.post(this.resourceUrl, id).map((res: Response) => {
            console.log('create---res: ', res);
            return res.json();
        });
    }

    update(device: DeviceMySuffix): Observable<DeviceMySuffix> {
        const copy = this.convert(device);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            console.log('update---res: ', res.json());
            return res.json();
        });
    }

    find(id: number): Observable<DeviceMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            console.log('find---res: ', res.json());
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        var result = this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
        console.log('create---res: ', result);
        return result;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(device: DeviceMySuffix): DeviceMySuffix {
        const copy: DeviceMySuffix = Object.assign({}, device);
        return copy;
    }
}
