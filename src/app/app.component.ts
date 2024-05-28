import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayPkmComponent } from './display-pkm/display-pkm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DisplayPkmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'proyecto_pokedex';
}
