import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Auth | undefined;

  get auth() {
    return { ...this.user }
  }

  constructor(private http: HttpClient ) { }

  authVerify(): Observable<boolean> {
    if( !localStorage.getItem('user_id' )){
      return of(false)
    }

    return this.http.get<Auth>(`${environment.apiUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          console.log(auth)
          return true
        })
      )
  }

  login() {
    return this.http.get<Auth>(`${environment.apiUrl}/usuarios/1`)
      .pipe(
        tap( res => this.user = res ),
        tap( res => localStorage.setItem('user_id', res.id))
      )
  }
}
