import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor( private heroService: HeroesService, 
               private activatedRoute: ActivatedRoute, 
               private router: Router, 
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroService.getHeroId(id) )
      )
      .subscribe( heroe => this.heroe = heroe)
    }
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id) {
      this.heroService.actualizarHero(this.heroe).subscribe(response => this.mostrarSnakbar('Registro actualizado'))
    }else {
      this.heroService.agregarHero(this.heroe).subscribe(response => {
        this.mostrarSnakbar('Registro creado con exito');
          this.router.navigate(['/heroes/editar', response.id])
        })
    }
  }

  borrar() {

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '30%',
      data: { ...this.heroe }
    } )

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.heroService.borrarHero(this.heroe).subscribe(()=>{
          this.mostrarSnakbar('Registro borrado con exito');
          this.router.navigate(['/heroes/listado'])
        })
      }
    })

  }

  mostrarSnakbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }
}
