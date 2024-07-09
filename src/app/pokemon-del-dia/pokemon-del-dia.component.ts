import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-pokemon-del-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-del-dia.component.html',
  styleUrl: './pokemon-del-dia.component.css',
})
export class PokemonDelDiaComponent implements OnInit {
  pokemon: any;
  loading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getRandomPokemon();
  }

  getRandomPokemon() {
    this.loading = true;
    this.pokemonService.getRandomPokemon().subscribe(
      (data) => {
        this.pokemon = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar la API:', error);
        this.loading = false;
      }
    );
  }
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
