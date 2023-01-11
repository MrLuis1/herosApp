import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'; 
import { Heroes } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroes[] = [];
  heroeSeleccionado!: Heroes | undefined;

  constructor( private heroService: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroService.getSugerencias(this.termino)
    .subscribe( heroes => this.heroes = heroes )
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    const nameHero: Heroes = event.option.value;
    this.termino = nameHero.superhero;

    if(!event.option.value){
      this.heroeSeleccionado = undefined
      return;
    }
    this.heroService.getHeroId( nameHero.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe )
  }
}
