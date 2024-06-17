import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin, map, switchMap } from 'rxjs';
import { Stat, Type } from './pokemon.interfaces';

export interface Sprites {
  frontDefault?: string;
  backDefault?: string;
  frontShiny?: string;
  backShiny?: string;
  dreamWorldFront?: string;
  officialArtworkFront?: string;
  animatedFrontDefault?: string;
  animatedBackDefault?: string;
  animatedFrontShiny?: string;
  animatedBackShiny?: string;
  mainImg?: string;
}


export interface PokemonImages {
  pokemonName: string;
  id: number;
  sprites: Sprites;
}

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
	private apiUrl = 'https://pokeapi.co/api/v2';
	private typeSelectedSubject = new Subject<number>();
	private generationSelectedSubject = new Subject<string>();
	private weaknessSelectedSubject = new Subject<number>(); 

	constructor(private http: HttpClient) {}

	getPokemons(): Observable<any> {
		const url = `${this.apiUrl}/pokemon?limit=5`;
		return this.http.get<any>(url);
	}

	getPokemon(pokemonName: string): Observable<any> {
    	const url = `${this.apiUrl}/pokemon/${pokemonName.toLowerCase()}`;
    	return this.http.get<any>(url);
	}

	getSinglePokemon(pokemonName: string, generation: string): Observable<any> {
    	const url = `${this.apiUrl}/pokemon/${pokemonName.toLowerCase()}`;
    	return this.http.get<any>(url).pipe(
			map(data => {
				const version = data.sprites.versions?.[generation];
				let mainImg = version ? version[Object.keys(version)[0]].front_default : data.sprites.front_default;

				const sprites: Sprites = {
					mainImg,
					frontDefault: data.sprites.front_default,
					backDefault: data.sprites.back_default,
					frontShiny: data.sprites.front_shiny,
					backShiny: data.sprites.back_shiny,
					dreamWorldFront: data.sprites.other?.dream_world?.front_default,
					officialArtworkFront: data.sprites.other?.['official-artwork']?.front_default,
					animatedFrontDefault: data.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default,
					animatedBackDefault: data.sprites.versions?.['generation-v']?.['black-white']?.animated?.back_default,
					animatedFrontShiny: data.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_shiny,
					animatedBackShiny: data.sprites.versions?.['generation-v']?.['black-white']?.animated?.back_shiny
				};

				const stats: Stat[] = data.stats.map((stat: any) => ({
					baseStat: stat.base_stat,
					name: stat.stat.name
				}));

				return {
					name: data.name,
					id: data.id,
					sprites: sprites,
					stats: stats
				};
			})
		);
	}

	getPokemonImages(pokemonName: string) : Observable<PokemonImages> {
		const url = `${this.apiUrl}/pokemon/${pokemonName.toLowerCase()}`;
		return this.http.get<any>(url).pipe(
			map(data => {
				const sprites: Sprites = {
					frontDefault: data.sprites.front_default,
					backDefault: data.sprites.back_default,
					frontShiny: data.sprites.front_shiny,
					backShiny: data.sprites.back_shiny
				};

				const otherSprites = data.sprites.other || {};
				if (otherSprites['dream_world'] && otherSprites['dream_world'].front_default) {
					sprites.dreamWorldFront = otherSprites['dream_world'].front_default;
				}
				if (otherSprites['official-artwork'] && otherSprites['official-artwork'].front_default) {
					sprites.officialArtworkFront = otherSprites['official-artwork'].front_default;
				}

				const versions = data.sprites.versions || {};
				if (versions['generation-v'] && versions['generation-v']['black-white'] && versions['generation-v']['black-white'].animated) {
					const animatedSprites = versions['generation-v']['black-white'].animated;
					if (animatedSprites.front_default) {
						sprites.animatedFrontDefault = animatedSprites.front_default;
					}
					if (animatedSprites.back_default) {
						sprites.animatedBackDefault = animatedSprites.back_default;
					}
					if (animatedSprites.front_shiny) {
						sprites.animatedFrontShiny = animatedSprites.front_shiny;
					}
					if (animatedSprites.back_shiny) {
						sprites.animatedBackShiny = animatedSprites.back_shiny;
					}
				}

				const images: PokemonImages = {
					pokemonName: data.name,
					id: data.id,
					sprites: sprites
				};

				return images;
			})
		);
	}

	getPokemonTypes(language: string = 'es'): Observable<{ name: string | undefined, id: number }[]> {
		return this.http.get<{ results: { url: string }[] }>(`${this.apiUrl}/type/`).pipe(
			switchMap(response => {
				const typeRequests = response.results.map(type => this.http.get<Type>(type.url));
				return forkJoin(typeRequests);
			}),
			map(types => {
				return types
					.filter(type => type.name !== 'unknown')
					.map(type => {
						const translatedName = type.names.find(name => name.language.name === language);
						const name = translatedName?.name;
						return { name, id: type.id };
					});
			})
		);
	}

	selectType(typeId: number): void {
		this.typeSelectedSubject.next(typeId);
	}

	onTypeSelected(): Observable<number> {
		return this.typeSelectedSubject.asObservable();
	}

	getPokemonByType(typeId: number, weakness: number): Observable<string[]> {
		if (weakness === -1) {
			return this.http.get<any>(`${this.apiUrl}/type/${typeId}`).pipe(
				map(response => response.pokemon.map((p: any) => p.pokemon.name))
			);
		}

		return forkJoin([
			this.http.get<any>(`${this.apiUrl}/type/${typeId}`),
			this.http.get<any>(`${this.apiUrl}/type/${weakness}`)
		]).pipe(
			switchMap(([typeResponse, weaknessResponse]) => {
				const pokemonsWithType: string[] = typeResponse.pokemon.map((p: any) => p.pokemon.name);
				const weaknessTypes: string[] = weaknessResponse.damage_relations.double_damage_from.map((type: any) => type.name);

				const weaknessRequests: Observable<any>[] = weaknessTypes.map((typeName: string) => this.http.get<any>(`${this.apiUrl}/type/${typeName}`));

				return forkJoin(weaknessRequests).pipe(
					map((weaknessResponses: any[]) => {
						const pokemonsNotAllowed : string[] = [].concat(...weaknessResponses.map((response: any) => response.pokemon.map((p: any) => p.pokemon.name)));
						let filteredPokemons = pokemonsWithType;
						if (pokemonsNotAllowed.length > 0) {
							filteredPokemons = pokemonsWithType.filter((pokemon:any) => !pokemonsNotAllowed.includes(pokemon));
						} 
						return filteredPokemons;
					})
				);
			})
		);
	}

	getPokemonGenerations(): Observable<{ value: string | undefined, id: string }[]> {
		return this.http.get<any>(`${this.apiUrl}/generation/`).pipe(
			map(response => response.results.map((generation: any) => {
				const id = generation.url.split('/').filter((part: string) => !!part).pop().toString();
				return { id, value: generation.name };
			}))
		);
	}

	selectGeneration(generation: string): void {
		this.generationSelectedSubject.next(generation);
	}

	onGenerationSelected(): Observable<string> {
		return this.generationSelectedSubject.asObservable();
	}

	selectWeakness(weakness: number): void {
		this.weaknessSelectedSubject.next(weakness);
	}
	
	onWeaknessSelected(): Observable<number> {
		return this.weaknessSelectedSubject.asObservable();
	}
}
