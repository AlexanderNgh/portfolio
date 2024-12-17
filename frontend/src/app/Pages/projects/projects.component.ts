import { Component, OnInit, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {MatChipsModule} from '@angular/material/chips';
import { ExperienceCardsComponent } from '../../components/experience-cards/experience-cards.component';
import {
  trigger,
  state,
  style,
  animate,
  transition, query, stagger
} from '@angular/animations';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, MatChipsModule, ExperienceCardsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [
    trigger('aboutCardsTrigger', [
      state('close', style({ transform: 'translateX(300%)' })), // Corrected 'translationX' to 'translateX' and closed the parentheses
      state('open', style({ transform: 'translateX(0)' })),  // Same here
      transition('close => open', [animate('1s ease-in')]),
    ]),

    trigger('loadTrigger', [
      state('hidden', style({
        transform: 'translateY(30%)', opacity: 0})
      ), state('shown', style({
        transform: 'translateY(0%)', opacity:100})
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
export class ProjectsComponent {
  // view children gets the array of elements we will apply the riseAnimation to
  // also set up the observer and visibility map to track
  @ViewChildren('parent') elements: QueryList<ElementRef> | null = null; // Reference to multiple elements
  private observer: IntersectionObserver;
  private visibilityMap: Map<Element, boolean> = new Map(); // Map to track visibility of each element


  // constructor
  constructor() {
    // this is the callback for the observer
    // for each of the entries first save the target
    // if it is currently interesting then add it to the map by setting it to true
    // otherwise set it to false
    const callback = (entries: any) => { 
      
      let index = 1;
      entries.forEach((entry: any)=> {

        const targetElement = entry.target;

        if (entry.isIntersecting) 
        {
          setTimeout(() => {
            console.log(`${targetElement} entered the viewport`);
            this.visibilityMap.set(targetElement, true);
            targetElement.classList.add('in-view'); 
            console.log(this.visibilityMap.get(targetElement))
          }, 500 * index)

          // console.log(`${targetElement} entered the viewport`);
          // this.visibilityMap.set(targetElement, true);
          // targetElement.classList.add('in-view'); 
          // console.log(this.visibilityMap.get(targetElement))
          index++;
        } 
        else 
        {
          console.log(`${targetElement} left the viewport`);
          //this.visibilityMap.set(targetElement, false);  // Set as not visible
          targetElement.classList.remove('in-view'); // Remove CSS class for out-of-view state
        }
      }
      )};

      // options
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }

      // make the observer
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

  // after view is initialized, observe the elements!
  ngAfterViewInit() {
    if (this.elements) {
      this.elements.forEach((box: ElementRef) => {
        this.observer.observe(box.nativeElement);
      });
    }
  }

}
