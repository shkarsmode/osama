import { Component, Input } from '@angular/core';

@Component({
  selector: 'burger-icon',
  templateUrl: './burger-icon.component.html',
  styleUrls: ['./burger-icon.component.scss']
})
export class BurgerIconComponent {

  @Input() active: boolean = false;

}
