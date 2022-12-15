import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ItemsService } from '@services';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  citySubject!: Subject<string | null>;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {
    this.citySubject = this.itemsService.citySubject ?? null;
  }

  /**
   * ! Just notations for subscribe
   */

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('shopping', params['tag']);
    })

    this.cityName()
    
  }


  private cityName() {
    this.route.params.subscribe(params => {
      const city = params['city'];
      this.citySubject.next(city);
    });

  }
}
