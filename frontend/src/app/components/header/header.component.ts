import { Component } from '@angular/core';
import { NavService } from '../../core/nav/nav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public navService: NavService){}
}
