import { Component } from '@angular/core';
import { AboutCardsComponent } from '../../components/about-cards/about-cards.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [AboutCardsComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],  // Fixed typo here as well (it should be 'styleUrls', not 'styleUrl')
  animations: [
    trigger('aboutCardsTrigger', [
      state('close', style({ transform: 'translateX(300%)' })), // Corrected 'translationX' to 'translateX' and closed the parentheses
      state('open', style({ transform: 'translateX(0)' })),  // Same here
      transition('close => open', [animate('1s ease-in')]),
    ]),
  ],
})
export class LandingComponent {
  test: string = 'test';
  test2: string = 'testing';
  protected cardState: 'open' | 'close' = 'close';

  clicked()
  {
    this.cardState='open';
  }
}
