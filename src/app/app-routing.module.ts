import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  {
    path: 'search',
    pathMatch: 'full',
    component: SearchComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
