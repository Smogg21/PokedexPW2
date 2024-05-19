import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonService } from './pokemon.service';
import { AdivinarPokemonComponent } from './adivinar-pokemon/adivinar-pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonComponent, PokemonSearchComponent, AdivinarPokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
	pokemon: any;
	loading: boolean = false;

  	constructor(private pokemonService: PokemonService) {}

	getPokemon(pokemonName: string) : void {
		this.loading = true;
		this.pokemonService.getPokemon(pokemonName)
			.subscribe(
				(data) => {
					this.pokemon = data;
					this.loading = false;
				},
				(error) => {
					console.log(error);
					this.loading = false;
				}
			)
	}
	title = 'pokedex';
}
