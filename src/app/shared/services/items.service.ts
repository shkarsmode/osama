import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";

import { map, Observable, Subject } from "rxjs";
import { BASE_URL } from "src/environment/variables";
import { DtoCategoryResponse } from "../interfaces/DtoCategoryResponse";
import { ICategory } from "../interfaces/ICategory";
import { IInfoCity } from "../interfaces/IInfoCity";

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
        return this.http.get<any>(`${this.basePath}/cities/${city}.json`)
            .pipe(map((response: any) => {
                return response;
            }))
    }


}