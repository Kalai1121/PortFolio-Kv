import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'skills', component: HomeComponent },
  { path: 'portfolio', component: HomeComponent },
  { path: 'contact', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: false, 
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })], // Disabled hash routing for clean HTML5 clean URLs
  exports: [RouterModule]
})
export class AppRoutingModule { }
