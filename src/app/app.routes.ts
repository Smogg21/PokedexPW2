import { PokemonesGridComponent } from './pokemones-grid/pokemones-grid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos/juegos.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PkdexRouteComponentComponent } from './pkdex-route-component/pkdex-route-component.component';
import { InicioComponentComponent } from './inicio-component/inicio-component.component';
import { PokemonDelDiaComponent } from './pokemon-del-dia/pokemon-del-dia.component';
import { PokeRunComponent } from './poke-run/poke-run.component';

export const routes: Routes = [
  { path: '', component: InicioComponentComponent },
  { path: 'pokedex', component: PkdexRouteComponentComponent },
  { path: 'cartas', component: PokemonesGridComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'pokemonDelDia', component: PokemonDelDiaComponent },
  { path: 'pokeRun', component: PokeRunComponent},  
];
