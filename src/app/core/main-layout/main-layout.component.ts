import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @ViewChild('suggestedBlock') suggestedBlock!: ElementRef;

  public moveViewToItems(): void {
    this.suggestedBlock.nativeElement.scrollIntoView();
  }

  public scrollToTopSide(event: Event): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
