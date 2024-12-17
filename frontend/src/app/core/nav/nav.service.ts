import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private router: Router) { }

  navigateAbout()
  {
    this.router.navigate(['/about']);
  }

  navigateHome()
  {
    this.router.navigate(['/home']);
  }

  navigateProjects()
  {
    this.router.navigate(['/projects']);
  }

}
