import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'skills', component: HomeComponent },
  { path: 'portfolio', component: HomeComponent },
  { path: 'contact', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: true, 
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })], // Hash routing is safer for simple static file serves
  exports: [RouterModule]
})
export class AppRoutingModule { }
