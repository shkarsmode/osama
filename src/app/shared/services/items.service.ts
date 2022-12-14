import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";

import { map, Observable } from "rxjs";
import { BASE_URL } from "src/environment/variables";
import { DtoCategoryResponse } from "../interfaces/DtoCategoryResponse";
import { ICategory } from "../interfaces/ICategory";

@Injectable()
export class ItemsService {

    private basePath = '/';

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


}