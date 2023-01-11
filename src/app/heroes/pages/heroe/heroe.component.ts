import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroes } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  constructor( private route: ActivatedRoute, private heroService: HeroesService, private router: Router) { }
  hero!: Heroes;

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( ({id}) => this.heroService.getHeroId(id) )
    ).subscribe( (hero) => this.hero = hero )
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
}
