import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../heroes/interfaces/hero.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroes ): string {
    return `assets/hero-img/${heroe.id}.jpg`;
  }

}
