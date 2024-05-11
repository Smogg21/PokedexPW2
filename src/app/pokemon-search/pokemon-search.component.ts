import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent {
	@Output() search = new EventEmitter<string>();
  	pokemonName: string = '';

  	constructor() {}

  	onSubmit(): void {
    	if (this.pokemonName.trim()) {
      		this.search.emit(this.pokemonName.trim());
    	}
  	}
}
