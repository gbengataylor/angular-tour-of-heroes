/** generated using ng generate component */

import { Component, OnInit, Input} from '@angular/core';
import { Hero } from '../heroes/hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; // so that extenal HeroesComponent can bind to the hero property

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  /** BACK BUTTON method\
  */
    goBack(): void {
    this.location.back();
  }

//save button action
  save(): void {
     this.heroService.updateHero(this.hero)
       .subscribe(() => this.goBack());
   }
}
