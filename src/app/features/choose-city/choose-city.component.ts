import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.scss']
})
export class ChooseCityComponent {

  @Output() close: EventEmitter<any> = new EventEmitter();
  
  public closeWindow(): void {
    this.close.emit();
  }

}
