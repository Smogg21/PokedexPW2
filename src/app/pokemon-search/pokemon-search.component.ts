import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutocompletadoComponent } from '../autocompletado/autocompletado.component';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [FormsModule, AutocompletadoComponent],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent {
	@Output() search = new EventEmitter<string>();
  	pokemonName: any = '';

  	constructor() {}

	onPokemonSelected(name: string): void {
		this.pokemonName = name;
	}

  	onSubmit(): void {
    	if (this.pokemonName.trim()) {
      		this.search.emit(this.pokemonName.trim());
    	}
  	}
}
