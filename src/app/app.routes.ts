import { Routes } from '@angular/router';
import { BrawlersComponent } from './component/brawlers/brawlers.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./component/login/login.component').then(m => m.LoginComponent)
  },
  { path: '', component: BrawlersComponent },
  { path: 'brawlers', component: BrawlersComponent },
  {
    path: 'brawler/:id',
    loadComponent: () =>
      import('./component/brawler-details/brawler-details.component').then(m => m.BrawlerDetailsComponent)
  },
  {
    path: 'add-brawler',
    loadComponent: () =>
      import('./component/add-brawler/add-brawler.component').then(m => m.AddBrawlerComponent)
  }
];
