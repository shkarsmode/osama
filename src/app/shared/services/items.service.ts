import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { ICategory, IInfoCity, DtoCategoryResponse } from "@interfaces";

import { map, Observable, Subject } from "rxjs";
import { BASE_URL } from "src/environment/variables";


@Injectable()
export class ItemsService {

    private basePath = '/';
    public citySubject: Subject<string | null> = new Subject();

    constructor(
        private http: HttpClient,
        @Optional() @Inject(BASE_URL) private baseUrl: string
    ) {
        this.basePath = (baseUrl ?? this.basePath);
    }

    getSuggestedCategories(): Observable<ICategory[]> {     
        return this.http.get<DtoCategoryResponse[]>(`${this.basePath}/categories.json`)
            .pipe(map((response: any) => {
                return Object.keys(response).map(id => {
                    return {
                        id,
                        ...response[id]    
                    }
                })
            }))
    }

    getInfoByCity(city: string): Observable<IInfoCity> {
        return this.http.get<IInfoCity>(`${this.basePath}/cities/${city}.json`);
    }


}