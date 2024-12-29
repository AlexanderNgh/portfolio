import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() desc: string = "";
  @Input() position: string = "";
  @Input() company: string = "";

  phone = "(702)-416-0384"
  email = "alexanderpham023@gmail.com"
}
