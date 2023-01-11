import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroes } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private http: HttpClient ) { } 

  getHero() {
    return this.http.get<Heroes[]>(`${environment.apiUrl}/heroes`)
  }

  getHeroId(id:string) {
    return this.http.get<Heroes>(`${environment.apiUrl}/heroes/${id}`)
  }

  getSugerencias(termino:string):Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${environment.apiUrl}/heroes?q=${termino}&_limit=5`);
  }
}
