import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-about-cards',
  standalone: true,
  imports: [],
  templateUrl: './about-cards.component.html',
})
export class AboutCardsComponent {
  @Input() title: string = "";
  @Input() text: string = "";
}
