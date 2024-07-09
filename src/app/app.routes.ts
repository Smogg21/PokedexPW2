import { PokemonesGridComponent } from './pokemones-grid/pokemones-grid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos/juegos.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PkdexRouteComponentComponent } from './pkdex-route-component/pkdex-route-component.component';

export const routes: Routes = [
  { path: 'pokedex', component: PkdexRouteComponentComponent },
  { path: 'cartas', component: PokemonesGridComponent },
  { path: 'juegos', component: JuegosComponent },
];
