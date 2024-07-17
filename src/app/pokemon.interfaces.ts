export interface SpriteUrls {
	mainImg?: string;
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
}

export interface Stat {
  baseStat: number;
  name: string;
}

export interface Pokemon {
  name: string;
  id: number;
  sprites: SpriteUrls;
  stats: Stat[];
}

export interface Type {
  name: string;
  names: { name: string, language: { name: string } }[];
  id: number;
}

export interface PokemonTypes {
  name: string | undefined;
  id: number;
}

export interface SpriteGenerations {
	id: string,
	value: string | undefined,
}