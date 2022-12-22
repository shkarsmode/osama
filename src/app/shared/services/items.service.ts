import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { ICategory, IInfoCity, DtoCategoryResponse, ISushi, DtoSushiResponse, IShortProductInfo } from "@interfaces";

import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs";
import { BASE_URL } from "src/environment/variables";


@Injectable()
export class ItemsService {

    private basePath = '/';
    private sushiInfoForHeader!: IShortProductInfo;
    public citySubject: Subject<string | null> = new Subject();
    public shortInfoSubject: BehaviorSubject<IShortProductInfo> = new BehaviorSubject(this.sushiInfoForHeader);

    constructor(
        private http: HttpClient,
        @Optional() @Inject(BASE_URL) private baseUrl: string
    ) {
        this.basePath = (baseUrl ?? this.basePath);
    }

    createNewSushi(item: any, category: string): Observable<any> {
        return this.http.post<any>(`${this.basePath}/sushi/${category}.json`, item)
            .pipe(map((response: any) => {
                return response;
            }));
    }

    getAllSushi(): Observable<any> {
        return this.http.get<any>(`${this.basePath}/sushi.json`)
            .pipe(map((response: any) => {
                return Object.keys(response).map(name => {
                    return {
                        name,
                        ...response[name]
                    }
                })
            }));
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
            }));
    }

    getInfoByCity(city: string): Observable<IInfoCity> {
        return this.http.get<IInfoCity>(`${this.basePath}/cities/${city}.json`);
    }

    getSushiByCategory(category: string): Observable<ISushi[]> {
        return this.http.get<DtoSushiResponse[]>(`${this.basePath}/sushi/${category}.json`)
            .pipe(map((response: any) => {
                return Object.keys(response).map(id => {
                    return {
                        id,
                        ...response[id]
                    }
                })
            }),
                error => error
            );
    }

    getProductByIdAndCategory(category: string, id: number): Observable<ISushi> {
        return this.http.get<DtoSushiResponse>(`${this.basePath}/sushi/${category}/${id}.json`)
            .pipe(
                tap(this.recordProductInfo.bind(this)),
                map((response: any) => {
                    if (response)
                        return {
                            id,
                            ...response
                        }
                    else return { result: 'notfound' }
                }),
                error => error
            );
    }

    private recordProductInfo(info: DtoSushiResponse): void {
        this.sushiInfoForHeader = {
            img: info.bigImg,
            name: info.name,
            composition: info.composition
        };

        this.shortInfoSubject.next(this.sushiInfoForHeader);
    }

}