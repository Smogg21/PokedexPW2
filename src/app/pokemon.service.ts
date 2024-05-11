import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
	private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

	constructor(private http: HttpClient) {}

	getPokemons(): Observable<any> {
		const url = `${this.apiUrl}?limit=5`;
		return this.http.get<any>(url);
	}

	getPokemon(pokemonName: string): Observable<any> {
    	const url = `${this.apiUrl}/${pokemonName.toLowerCase()}`;
    	return this.http.get<any>(url);
	}
}
