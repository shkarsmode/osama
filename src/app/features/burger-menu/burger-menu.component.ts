import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
  public isClosingAnim: boolean = false;

  closeWindow(): void {
    this.close.emit();
  }
}
