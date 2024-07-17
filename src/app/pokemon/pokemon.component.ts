import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
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
export class PokemonComponent implements OnChanges, AfterViewInit {
  @Input() pokemon: any;
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  pokemonLoaded = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      this.pokemonLoaded = false;
      this.updateAudioSource();
    }
  }

  ngAfterViewInit(): void {
    this.updateAudioSource();
  }

  updateAudioSource(): void {
    if (this.pokemon && this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.src =
        this.pokemon.cries.legacy || this.pokemon.cries.latest;
      this.audioElement.nativeElement.load();
      this.pokemonLoaded = true;
      this.playAudio();
    }
  }

  playAudio(): void {
    if (
      this.pokemonLoaded &&
      this.audioElement &&
      this.audioElement.nativeElement
    ) {
      this.audioElement.nativeElement.volume = 0.1;
      this.audioElement.nativeElement
        .play()
        .catch((error) => console.error('Error playing audio:', error));
    }
  }

  previousPokemon(): void {
    this.pokemonService
      .getPokemonByNumber(this.pokemon.id - 1)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.updateAudioSource();
      });
  }

  nextPokemon(): void {
    this.pokemonService
      .getPokemonByNumber(this.pokemon.id + 1)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.updateAudioSource();
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
      default:
        return 'default-type';
    }
  }

  playPokemonCry() {
    this.playAudio();
  }
}
