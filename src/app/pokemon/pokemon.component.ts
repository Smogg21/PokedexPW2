import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-pokemon',
	templateUrl: './pokemon.component.html',
	styleUrls: ['./pokemon.component.css'],
	standalone: true,
	imports: [CommonModule]
})

export class PokemonComponent {
	@Input() pokemon: any;

	constructor() {}
}
