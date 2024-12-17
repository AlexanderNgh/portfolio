import { Component,
        OnInit
 } from '@angular/core';

@Component({
  selector: 'app-typer',
  standalone: true,
  imports: [],
  templateUrl: './typer.component.html',
  styleUrl: './typer.component.css'
})
export class TyperComponent implements OnInit{
  constructor(){}
  currentString: string = ''
  stringBank: string[] = ['Bug Developer', 'Web Enthusiast', 'Expert Google Searcher', 'ChatGPT Connoisseur', 'Angular Elitist']
  index:number = 0;

  delay()
  {

  }

  async typingCallback()
  {
    if(this.index >= 3)
    {
      this.index = 0;
    }

    let length = this.stringBank[this.index].length;
    let current = this.stringBank[this.index]
    for(let i = 0; i < length; i++)
    {
      this.currentString += current[i];
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    for(let i = 0; i < length; i++)
    {
        this.currentString = this.currentString.slice(0, -1);
        await new Promise(resolve => setTimeout(resolve, 100))
    }

    this.index++;
    this.typingCallback();
  }

  ngOnInit(): void {
    this.typingCallback();
  }
}
