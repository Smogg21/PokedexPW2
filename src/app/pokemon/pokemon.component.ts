import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PokemonComponent {
  @Input() pokemon: any;
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

  constructor(private pokemonService: PokemonService) {}

  playAudio(): void {
    if (this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.volume = 0.1;
      this.audioElement.nativeElement.play();
    }
  }

  ngOnChanges(): void {
    if (this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.load();
      this.playAudio();
    }
  }

  previousPokemon(): void {
    this.pokemonService
      .getPokemonByNumber(this.pokemon.id - 1)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }

  nextPokemon(): void {
    this.pokemonService
      .getPokemonByNumber(this.pokemon.id + 1)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }

  getPokemonTypeClass(type: string) {
    switch (type) {
      case 'fire':
        return 'fire-type';
      case 'water':
        return 'water-type';
      case 'grass':
        return 'grass-type';
      case 'electric':
        return 'electric-type';
      case 'normal':
        return 'normal-type';
      case 'ice':
        return 'ice-type';
      case 'ground':
        return 'ground-type';
      case 'flying':
        return 'flying-type';
      case 'poison':
        return 'poison-type';
      case 'bug':
        return 'bug-type';
      case 'fighting':
        return 'fighting-type';
      case 'psychic':
        return 'psychic-type';
      case 'rock':
        return 'rock-type';
      case 'ghost':
        return 'ghost-type';
      case 'dark':
        return 'dark-type';
      case 'dragon':
        return 'dragon-type';
      case 'steel':
        return 'steel-type';
      case 'fairy':
        return 'fairy-type';

      // Add more cases for other types
      default:
        return 'default-type';
    }
  }
}
