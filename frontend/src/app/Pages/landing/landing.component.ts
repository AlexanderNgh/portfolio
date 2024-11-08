import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AboutCardsComponent } from '../../components/about-cards/about-cards.component';
import {
  trigger,
  state,
  style,
  animate,
  transition, query, stagger
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

    trigger('loadTrigger', [
      state('hidden', style({
        transform: 'translateX(100%)', opacity: 0})
      ), state('shown', style({
        transform: 'translateX(0%)', opacity:100})
      ), transition('hidden => shown', [
        animate('1s ease-in')
      ]),]),

    trigger("staggerTrigger", [
      transition( '* <=> *', [
        query(':enter', [
          style({opacity: 1, transform: 'scale(0.7)'}),
          stagger(100, [
            animate('500ms ease-in', style({opacity:1, transform:'scale(1)'}))
          ],), 
        ], {optional:true}),

        query(':leave', [
          style({opacity: 1, transform: 'scale(1)'}),
          stagger(-100, [
            animate('500ms ease-in', style({opacity:0, transform:'scale(0.7)'}))
          ],), 
        ], {optional:true})
      ])
    ]),

  ],
})
export class LandingComponent implements AfterViewInit{
  test: string = 'test';
  test2: string = 'testing';
  protected cardState: 'open' | 'close' = 'close';
  protected state: 'shown' | 'hidden' = 'hidden';

  nums = [0]
  clicked()
  {
    this.cardState='open';
  }

  add()
  {
    this.nums = [...this.nums, this.nums.length + 1]
  }

  ngAfterViewInit() {
    setTimeout( () => {
    this.state = 'shown';
    }, 1000);
  }
}
