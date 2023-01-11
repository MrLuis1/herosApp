import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  constructor( private heroService: HeroesService) { }

  newHeros: Heroes[] = [];

  ngOnInit(): void {

    this.heroService.getHero()
      .subscribe( res => this.newHeros = res )

  }

}
