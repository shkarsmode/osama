import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-choose-city',
    templateUrl: './choose-city.component.html',
    styleUrls: ['./choose-city.component.scss']
})
export class ChooseCityComponent implements OnInit, OnDestroy {

    @Output() close: EventEmitter<any> = new EventEmitter();
    subParam!: Subscription;
    tag!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.listenToQueryParams();
    }

    public closeWindow(): void {
        this.close.emit();
    }

    public chooseCity(city: string): void {
        if (!this.tag) return;
        this.router.navigate(['/shop', city], {
            queryParams: { tag: this.tag }
        });
    }

    private listenToQueryParams(): void {
        this.subParam = this.route.queryParams.subscribe((params: Params) => {
            this.tag = params['tag'];
        })
    }

    ngOnDestroy(): void {
        this.subParam.unsubscribe();
    }
}

