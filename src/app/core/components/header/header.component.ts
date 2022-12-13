import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';


import { BurgerMenuComponent } from 'src/app/features/burger-menu/burger-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isOpenBurgerMenu: boolean = false;

  @ViewChild('burgerRef', { read: ViewContainerRef, static: true}) private burgerRef!: ViewContainerRef;
  private componentRef!: ComponentRef<BurgerMenuComponent>;

  
  constructor() {}

  ngOnInit(): void {
  }

  public toggleBurgerMenu(): void {
    this.isOpenBurgerMenu = !this.isOpenBurgerMenu;
    const toggleFuncToRun = (this.isOpenBurgerMenu ? 
      this.openBurgerMenu : this.closeBurgerMenu).bind(this);
    toggleFuncToRun();
  }

  private closeBurgerMenu(): void {
    this.componentRef.instance.isClosingAnim = true;
  }

  private openBurgerMenu(): void {
    this.burgerRef.clear();
    this.componentRef = this.burgerRef.createComponent(BurgerMenuComponent);
    
  }
}
