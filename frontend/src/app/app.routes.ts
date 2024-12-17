import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { AboutComponent } from './Pages/about/about.component';
import { ProjectsComponent } from './Pages/projects/projects.component';

export const routes: Routes = [
    {path:'', component:LandingComponent},
    {path:'home', component:LandingComponent},
    {path:'about', component:AboutComponent},
    {path:'projects', component:ProjectsComponent}
];
