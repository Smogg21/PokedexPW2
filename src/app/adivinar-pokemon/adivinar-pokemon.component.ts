import { Component, Output, EventEmitter } from '@angular/core';
import nombresPokemon from '../../nombresPokemon.json';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-adivinar-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './adivinar-pokemon.component.html',
  styleUrl: './adivinar-pokemon.component.css'
})
export class AdivinarPokemonComponent {
	@Output() search = new EventEmitter<string>();
	pokemon: any;
	listaPokemons : string[] = [];
	pokemonSeleccionado!: string;
	opciones: string[] = [];
	puntaje: number = 0;
	juegoTerminado: boolean = false;

	constructor(private pokemonService: PokemonService) {}

	comenzarJuego() : void {
		if (this.juegoTerminado) {
			this.puntaje = 0;
			this.listaPokemons = [];
			this.juegoTerminado = false;
		}
		const nombrePokemon = this.obtenerNombrePokemonAleatorio();
		this.pokemonSeleccionado = nombrePokemon;
		this.search.emit(nombrePokemon.toLowerCase().trim());
		this.pokemonService.getPokemon(nombrePokemon).subscribe(data => {
			this.pokemon = this.formatearDatosPokemon(data);
			this.generarOpciones(nombrePokemon);
		});
	}

	obtenerNombrePokemonAleatorio(pokemonCorrecto: string | null = null) : string {
		let pokemonesDisponibles : string[] = nombresPokemon.filter(pokemon => !this.listaPokemons.includes(pokemon))
		if (pokemonCorrecto) {
			pokemonesDisponibles = pokemonesDisponibles.filter(pokemon => pokemon !== pokemonCorrecto);
		}
		const pokemonAleatorio : string = pokemonesDisponibles[Math.floor(Math.random() * pokemonesDisponibles.length)];
		this.listaPokemons.push(pokemonAleatorio);
		return pokemonAleatorio;
	}

	formatearDatosPokemon(data: any) {
		return {
			src: data.sprites.front_default,
			alt: data.name,
		};
	}

	generarOpciones(pokemonCorrecto: string): string[] {
		this.opciones = [];
		this.opciones.push(this.obtenerNombrePokemonAleatorio(pokemonCorrecto));
		this.opciones.push(this.obtenerNombrePokemonAleatorio(pokemonCorrecto));
		this.opciones.push(pokemonCorrecto);
		return this.opciones.sort(() => Math.random() - 0.5);
	}

	elegirRespuesta(opcion: string): void {
	console.log(this.puntaje);
		console.log(this.juegoTerminado);
		if (opcion === this.pokemonSeleccionado) {
			this.puntaje++;
			if (this.puntaje >= 5) {
				this.juegoTerminado = true;
			} else {
				this.comenzarJuego();
			}
		} else {
			this.comenzarJuego();
		}
	}
}
