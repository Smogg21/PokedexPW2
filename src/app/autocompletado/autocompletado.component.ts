import { Component, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import nombresPokemon from '../../nombresPokemon.json';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocompletado',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './autocompletado.component.html',
  styleUrl: './autocompletado.component.css'
})
export class AutocompletadoComponent {
	@Input() pokemonName: any;
	pokemonList: string[] = nombresPokemon;
	filteredNames: string[] = [];
	selectedName: string = '';
  	
	@Output() pokemonSelected = new EventEmitter<string>();
	@ViewChild('pkmNameInput') pkmNameInput!: ElementRef;
	
	filterPokemonNames(event: Event): void  {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value.toLowerCase().trim();
		this.pokemonName = inputValue;
		this.filteredNames = this.pokemonList.filter(name => {
			const matchExp = new RegExp("^" + inputValue.toLowerCase());
			return 	matchExp.test(name.toLowerCase());
		});
		this.emitPokemonName(); 
	}

	selectPokemon(name: string): void {
		this.pkmNameInput.nativeElement.value = name; 
		this.selectedName = name;
		this.filteredNames = [];
		this.pokemonSelected.emit(this.selectedName);
	}

	onInputBlur(): void {
		setTimeout(() => {
			this.clearFilteredNames();
		}, 200);
	}

	clearFilteredNames(): void {
		this.filteredNames = [];
	}


	private emitPokemonName(): void {
		this.pokemonSelected.emit(this.pokemonName);
	}
}
