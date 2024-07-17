import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemones-grid',
  standalone: true,
  imports: [],
  templateUrl: './pokemones-grid.component.html',
  styleUrl: './pokemones-grid.component.css',
})
export class PokemonesGridComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonNames: string[] = [];
  limit = 8;
  offset = 1;
  loading = false;
  private typeSubscription!: Subscription;
  private generationSubscription!: Subscription;
  type: number = -1;
  generation: string = 'NA';
  weakness: number = -1;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
	console.log(this.pokemons?.[0])

    this.typeSubscription = this.pokemonService
      .onTypeSelected()
      .subscribe((typeId) => {
        this.type = typeId;
        this.offset = 1;
        this.fetchPokemonsBasedOnFilters();
      });

    this.generationSubscription = this.pokemonService
      .onGenerationSelected()
      .subscribe((generation) => {
        this.generation = generation;
        this.offset = 1;
        this.fetchPokemonsBasedOnFilters();
      });

    this.typeSubscription = this.pokemonService
      .onWeaknessSelected()
      .subscribe((weakness) => {
        this.weakness = weakness;
        this.offset = 1;
        this.fetchPokemonsBasedOnFilters();
      });
  }

  fetchPokemons(): void {
    this.loading = true;
    this.pokemons = [];

    if (this.weakness !== -1) {
      this.fetchPokemonsByWeakness();
      return;
    }

    for (let i = this.offset; i <= this.offset + this.limit; i++) {
      this.pokemonService
        .getSinglePokemon(i.toString(), this.generation)
        .subscribe((pokemon) => {
          this.pokemons.push(pokemon);
          this.pokemons = this.pokemons.sort(
            (first, second) => first.id - second.id
          );
          if (this.pokemons.length === this.limit + 1) {
            this.loading = false;
          }
        });
    }
  }

  previousPage(): void {
    if (this.offset !== 1) {
      this.offset -= this.limit + 1;
      this.fetchPokemonsBasedOnFilters();
    }
  }

  nextPage(): void {
    this.offset += this.limit + 1;
    this.fetchPokemonsBasedOnFilters();
  }

  fetchPokemonsByType(): void {
    this.loading = true;
    this.pokemonService
      .getPokemonByType(this.type, this.weakness)
      .subscribe((pokemonNames) => {
        this.pokemonNames = pokemonNames;
        if (this.pokemonNames.length === 0) {
          // aqui se deberia presentar un mensaje indicando que no se encontraron pokemones
          this.loading = false;
          return;
        }
        this.pokemons = [];
        for (let i = this.offset - 1; i <= this.offset + this.limit - 1; i++) {
          if (!this.pokemonNames[i]) {
            this.loading = false;
            return;
          }
          this.pokemonService
            .getSinglePokemon(this.pokemonNames[i], this.generation)
            .subscribe((pokemon) => {
              this.pokemons.push(pokemon);
              this.pokemons = this.pokemons.sort(
                (first, second) => first.id - second.id
              );
              if (this.pokemons.length === this.limit + 1) {
                this.loading = false;
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
    if (this.generationSubscription) {
      this.generationSubscription.unsubscribe();
    }
  }

  fetchPokemonsBasedOnFilters(): void {
    if (this.type !== -1) {
      this.fetchPokemonsByType();
    } else if (this.weakness !== -1) {
      this.fetchPokemonsByWeakness();
    } else {
      this.fetchPokemons();
    }
  }

  fetchPokemonsByWeakness(): void {
    this.loading = true;
    this.pokemonService
      .getPokemonsByWeakness(this.weakness)
      .subscribe((pokemonsNotAllowed) => {
        this.pokemons = [];

        const fetchNextPokemon = (currentOffset: number) => {
          if (this.pokemons.length > this.limit) {
            this.loading = false;
            return;
          }

          this.pokemonService
            .getSinglePokemon(currentOffset.toString(), this.generation)
            .subscribe((pokemon) => {
              if (!pokemonsNotAllowed.includes(pokemon.name)) {
                this.pokemons.push(pokemon);
                this.pokemons = this.pokemons.sort(
                  (first, second) => first.id - second.id
                );
              }

              fetchNextPokemon(currentOffset + 1);
            });
        };

        fetchNextPokemon(this.offset);
      });
  }
}
