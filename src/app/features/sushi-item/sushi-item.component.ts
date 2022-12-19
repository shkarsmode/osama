import { Component, Input } from '@angular/core';
import { ISushi } from '@interfaces';

@Component({
  selector: 'app-sushi-item',
  templateUrl: './sushi-item.component.html',
  styleUrls: ['./sushi-item.component.scss']
})
export class SushiItemComponent {

  @Input() item!: ISushi;

}
