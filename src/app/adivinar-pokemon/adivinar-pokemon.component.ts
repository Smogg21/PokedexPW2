import { Component, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
	@ViewChild('pokemonImage') pokemonImage!: ElementRef;

	pokemon: any;
	listaPokemons : string[] = [];
	pokemonSeleccionado!: string;
	opciones: string[] = [];
	puntaje: number = 0;
	juegoTerminado: boolean = false;
	opcionesHabilitadas!: boolean;
	tiempo: number = 30;
	intervalo: any;

	constructor(private pokemonService: PokemonService, private renderer: Renderer2) {}

	comenzarJuego(iniciarTimer: boolean = false) : void {
		if (this.juegoTerminado) {
			this.puntaje = 0;
			this.listaPokemons = [];
			this.juegoTerminado = false;
			this.tiempo = 30;
		}
		const nombrePokemon = this.obtenerNombrePokemonAleatorio();
		this.pokemonSeleccionado = nombrePokemon;
		this.pokemonService.getPokemon(nombrePokemon.toLowerCase().trim()).subscribe(
			data => {
				if (iniciarTimer) {
					this.comenzarTimer();
				}
				this.pokemon = this.formatearDatosPokemon(data);
				this.generarOpciones(nombrePokemon);
				this.opcionesHabilitadas = true;

				if (this.pokemonImage) {
					this.renderer.addClass(this.pokemonImage.nativeElement, 'pokemon-oculto');
				}
			},
			error => {
				console.error('Error al obtener los datos de la API:', error);
			}
		);
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
		if (this.opcionesHabilitadas) {
			this.opcionesHabilitadas = false;
			this.renderer.removeClass(this.pokemonImage.nativeElement, 'pokemon-oculto');
			if (opcion === this.pokemonSeleccionado) {
				this.puntaje++;
				this.esperarUnSegundo(() => {
					if (this.tiempo > 0) {
						this.comenzarJuego()
					}	
				});	
			} else {
				this.esperarUnSegundo(() => {
					if (this.tiempo > 0) {
						this.comenzarJuego()
					}	
				});
			}
		}
	}

	esperarUnSegundo(func: Function) : void {
		setTimeout(func, 1000)
	}

	comenzarTimer() {
		this.intervalo = setInterval(() => {
			this.tiempo--;
			if (this.tiempo === 0) {
				this.detenerTimer();
				this.juegoTerminado = true;
				this.pokemon = null;
			}
		}, 1000);
	}

  	detenerTimer() {
		clearInterval(this.intervalo);
	}
}
