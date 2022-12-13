import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @ViewChild('suggestedBlock') suggestedBlock!: ElementRef;

  public moveViewToItems(): void {
    console.log();
    this.suggestedBlock.nativeElement.scrollIntoView();
    
  }
}
