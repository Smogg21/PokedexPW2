import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonTypes, SpriteGenerations } from '../pokemon.interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
	@ViewChild('sidebar') sidebar!: ElementRef;

	pokemonTypes: PokemonTypes[] = [];
	spriteGenerations: SpriteGenerations[] = [];
	pokemonTypesWeak: PokemonTypes[] = [];

	selectedTypeID: number = -1;
	selectedGeneration: number = -1;
	selectedWeakness: number = -1;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemonService.getPokemonTypes('es').subscribe(types => {
			this.pokemonTypes = types.concat({ name: 'Todos', id: -1 });
			this.pokemonTypesWeak = types.concat({ name: 'NA', id: -1});
		});

		this.pokemonService.getPokemonGenerations().subscribe(generations => {
			this.spriteGenerations = generations.concat({ value: '', id: "NA" });
		})
	}

	openSidebar(): void {
		this.sidebar.nativeElement.classList.remove('ocultar-sidebar');
  	}

	closeSidebar(): void {
    	this.sidebar.nativeElement.classList.add('ocultar-sidebar');
  	}

	onTypeChange(event: Event): void {
		const selectElement = event.target as HTMLSelectElement;
		const selectedTypeId = Number(selectElement.value);
		this.pokemonService.selectType(selectedTypeId);
	}

	onGenerationChange(event: Event) : void {
		const selectElement = event.target as HTMLSelectElement;
		this.pokemonService.selectGeneration(selectElement.value);
	}

	onWeaknessChange(event: Event) : void {
		const selectElement = event.target as HTMLSelectElement;
		const selectedWeakness = Number(selectElement.value);
		this.pokemonService.selectWeakness(selectedWeakness);	
	}
}
