import { Component, OnInit, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { AboutCardsComponent } from '../../components/about-cards/about-cards.component';
import { ViewChildren } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition, query, stagger
} from '@angular/animations';
//import { Element } from '@angular/compiler';
import { After } from 'v8';

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
        transform: 'translateX(20%)', opacity: 0})
      ), state('shown', style({
        transform: 'translateX(0%)', opacity:100})
      ), transition('hidden => shown', [
        animate('1s ease-in')
      ]),]),

    trigger("staggerTrigger", [
      transition( '* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'scale(0.7)'}),
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

    trigger('inOutAnimation', [
      transition('inView => outView', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
      transition('outView => inView', [
        animate('300ms ease-in', style({ opacity: 1 })),
      ])
    ]),

  ],
})
export class LandingComponent implements AfterViewInit{
  @ViewChildren('parent') elements: QueryList<ElementRef> | null = null; // Reference to multiple elements
  private observer: IntersectionObserver;
  private visibilityMap: Map<Element, boolean> = new Map(); // Map to track visibility of each element
  private elementMap: Map<ElementRef, Element> = new Map();

  // constructor
  constructor() {
    const callback = (entries: any) => { 
      
      entries.forEach((entry: any)=> {

        const targetElement = entry.target;

        if (entry.isIntersecting) 
        {
          console.log(`${targetElement} entered the viewport`);
          this.visibilityMap.set(targetElement, true);
          targetElement.classList.add('in-view'); 
          console.log(this.visibilityMap.get(targetElement))
        } 
        else 
        {
          console.log(`${targetElement} left the viewport`);
          this.visibilityMap.set(targetElement, false);  // Set as not visible
          targetElement.classList.remove('in-view'); // Remove CSS class for out-of-view state
        }
      }
      )};

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }

      this.observer = new IntersectionObserver(callback, options);
  
  }

  // for the html to call! 
  triggerHelper(ref: HTMLElement)
  {
    const native = ref;
    const flag = this.visibilityMap.get(native);
    if(flag)
    {
      return 'shown';
    }else
    {
      return 'hidden';
    }
  }

  ngAfterViewInit() {
    if (this.elements) {
      this.elements.forEach((box: ElementRef) => {
        this.observer.observe(box.nativeElement);
      });
    }
  }

}
