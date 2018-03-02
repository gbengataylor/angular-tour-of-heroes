/** generated using ng generate component */

import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //selectedHero: Hero;
  heroes : Hero[]; // will be loaded from serivce

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }


  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes(); // this is synchronous
// in real app will not work since it will get from remote service which is inherently async
// need to return a Promise, like an Observable
    this.heroService.getHeroes()
	.subscribe(heroes => this.heroes = heroes);
/*
The previous version assigns an array of heroes to the component's heroes property. The assignment occurs synchronously, as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.

That won't work when the HeroService is actually making requests of a remote server.

The new version waits for the Observable to emit the array of heroes— which could happen now or several minutes from now. Then subscribe passes the emitted array to the callback, which sets the component's heroes property.

This asynchronous approach will work when the HeroService requests heroes from the server.
*/
  }

  /** add a new hero */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();

    /**If you neglect to subscribe(),
    the service will not send the delete request to the server!
    As a rule, an Observable does nothing until something subscribes!
Confirm this for yourself by temporarily removing the subscribe(), clicking "Dashboard", then clicking "Heroes". You'll see the full list of heroes again.
*/
  }
}
