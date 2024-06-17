import { Routes } from '@angular/router';
import { PokemonesGridComponent } from './pokemones-grid/pokemones-grid.component';
import { JuegosComponent } from './juegos/juegos.component';

export const routes: Routes = [
	{ path: "", component: PokemonesGridComponent },
	{ path: "juegos", component: JuegosComponent }
];
