import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

@Component({
	selector: 'app-pokemon',
	templateUrl: './pokemon.component.html',
	styleUrls: ['./pokemon.component.css'],
	standalone: true,
	imports: [CommonModule]
})

export class PokemonComponent implements AfterViewInit  {
	@Input() pokemon: any;
	@ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

	constructor() {}

	playAudio(): void {
		if (this.audioElement && this.audioElement.nativeElement) {
			this.audioElement.nativeElement.play();
		}
	}

	ngAfterViewInit(): void {
		if (this.pokemon && this.audioElement) {
			this.audioElement.nativeElement.play();
		}
	}

	ngOnChanges(): void {
		if (this.audioElement && this.audioElement.nativeElement) {
			this.audioElement.nativeElement.load();
			this.playAudio();
		}
	}
}
