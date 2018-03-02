/**
Routes - https://angular.io/tutorial/toh-pt5
// generated using ng generate route
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
A typical Angular Route has two properties:

path: a string that matches the URL in the browser address bar.
component: the component that the router should create when navigating to this route.
You intend to navigate to the HeroesComponent when the URL is something like localhost:4200/heroes.

*/
import { HeroesComponent }      from './heroes/heroes.component';



/**
dashboard router component*/

import { DashboardComponent }   from './dashboard/dashboard.component';


import { HeroDetailComponent }  from './hero-detail/hero-detail.component';


const routes: Routes = [
  /** heroes route */
  { path: 'heroes', component: HeroesComponent },
  /* dashboard route */
  { path: 'dashboard', component: DashboardComponent },
/**
When the app starts, the browsers address bar points to the web site's root.
 That doesn't match any existing route so the router doesn't navigate
  anywhere. The space below the <router-outlet> is blank.
To make the app navigate to the dashboard automatically,
add the following route to the AppRoutingModule.Routes array.
*/
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

/** path for hero HeroDetailComponent
*/
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  /**
  Add an @NgModule.exports array with RouterModule in it.
  Exporting RouterModule makes router directives available
  for use in the AppModule components that will need them.
  */
  exports: [ RouterModule ],
  /*
  You first must initialize the router and start it listening for browser
  location changes.

Add RouterModule to the @NgModule.imports array and configure it
with the routes in one step by calling RouterModule.forRoot()
within the imports array, like this:
*/
  imports: [ RouterModule.forRoot(routes) ],
  /**
  The method is called forRoot() because you configure the router at
  the application's root level. The forRoot() method supplies the service
   providers and directives needed for routing, and performs the initial
    navigation based on the current browser URL.
    **/
})
export class AppRoutingModule { }
