import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search.component';
import { PokemonService } from '../pokemon.service';
import { AdivinarPokemonComponent } from '../adivinar-pokemon/adivinar-pokemon.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-pkdex-route-component',
  standalone: true,
  imports: [
    RouterOutlet,
    PokemonComponent,
    PokemonSearchComponent,
    AdivinarPokemonComponent,
    SidebarComponent,
    RouterModule,
  ],
  templateUrl: './pkdex-route-component.component.html',
  styleUrl: './pkdex-route-component.component.css',
})
export class PkdexRouteComponentComponent {
  pokemon: any;
  loading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  getPokemon(pokemonName: string): void {
    this.loading = true;
    this.pokemonService.getPokemon(pokemonName).subscribe(
      (data) => {
        this.pokemon = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  title = 'pokedex';
}
