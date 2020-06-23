import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardtitle',
  templateUrl: './cardtitle.component.html',
  styleUrls: []
})
export class CardTitleComponent {

  @Input() title: string;
  @Input() title2: string;

  constructor() { }

}
