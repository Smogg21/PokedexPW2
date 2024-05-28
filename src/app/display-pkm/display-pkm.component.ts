import { Component } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-display-pkm',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './display-pkm.component.html',
  styleUrl: './display-pkm.component.css'
})
export class DisplayPkmComponent {
  resultado: any;
  pkmName: string = ''; 
  
  constructor(private service: PokeApiService) {
    
   }

  buscarPkmn(pkmName: string){
    this.service.getPkm(pkmName).subscribe((data) => {
      this.resultado = data;
      console.log(data)
    });
  }
}
