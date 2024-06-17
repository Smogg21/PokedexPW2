import { Component } from '@angular/core';
import { AdivinarPokemonComponent } from '../adivinar-pokemon/adivinar-pokemon.component';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [AdivinarPokemonComponent],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})
export class JuegosComponent {

}
