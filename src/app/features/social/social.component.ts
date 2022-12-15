import { Component, Input, OnInit } from '@angular/core';
import { IInfoCity } from 'src/app/shared/interfaces/IInfoCity';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  @Input() info?: IInfoCity;
  
  ngOnInit(): void {
    
  }

}
