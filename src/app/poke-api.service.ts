import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  getPkm(pokemon: string): Observable<any> {
    return this.http.get<any>(`https://ejemplo.com/api/datos?parametro=${pokemon}`);
  }
}
