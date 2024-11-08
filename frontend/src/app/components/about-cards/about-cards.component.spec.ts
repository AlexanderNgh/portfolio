import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCardsComponent } from './about-cards.component';

describe('AboutCardsComponent', () => {
  let component: AboutCardsComponent;
  let fixture: ComponentFixture<AboutCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
