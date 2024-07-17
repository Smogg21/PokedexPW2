import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-memory-game',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="game-container">
      <h2>Pokemon Memory Game</h2>
      <div id="score-board">
        <p>Pares Encontrados: {{ pairsFound }}</p>
        <p>Fallos: {{ errors }}</p>
      </div>
      <div id="game-board">
        <div
          *ngFor="let card of cards; let i = index"
          class="card"
          [class.flipped]="card.flipped"
          (click)="flipCard(i)"
        >
          <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">
              <img
                *ngIf="card.imageUrl"
                [src]="card.imageUrl"
                [alt]="'Pokemon ' + card.id"
              />
              <span *ngIf="!card.imageUrl">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <button id="reset-button" (click)="resetGame()">Reiniciar Juego</button>
    </div>
  `,
  styles: [
    `
      .game-container {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #f0f0f0;
        padding: 20px;
      }
      #score-board {
        margin-top: 20px;
      }
      #score-board p {
        margin: 5px;
        font-size: 18px;
      }
      #game-board {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
      }
      .card {
        width: 100px;
        height: 100px;
        perspective: 1000px;
        cursor: pointer;
      }
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      .card.flipped .card-inner {
        transform: rotateY(180deg);
      }
      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .card-front {
        background-color: #3498db;
        color: white;
        font-size: 24px;
        font-weight: bold;
      }
      .card-back {
        background-color: #ffffff;
        transform: rotateY(180deg);
      }
      .card-back img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      }
      #reset-button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      #reset-button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class PokemonMemoryGameComponent implements OnInit {
  cards: Array<{ id: number; imageUrl: string | null; flipped: boolean }> = [];
  pairsFound = 0;
  errors = 0;
  flippedCards: number[] = [];
  lockBoard = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.resetGame();
  }

  async resetGame() {
    this.cards = [];
    this.pairsFound = 0;
    this.errors = 0;
    this.flippedCards = [];
    this.lockBoard = false;
    const pokemonIds = this.generatePokemonIds();
    for (const id of pokemonIds) {
      this.cards.push({ id, imageUrl: null, flipped: false });
      this.fetchPokemonImage(id);
    }
  }

  generatePokemonIds(): number[] {
    const ids: number[] = [];
    while (ids.length < 8) {
      const id = Math.floor(Math.random() * 151) + 1;
      if (!ids.includes(id)) {
        ids.push(id, id);
      }
    }
    return ids.sort(() => Math.random() - 0.5);
  }

  async fetchPokemonImage(id: number) {
    try {
      const response: any = await this.http
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .toPromise();
      const indices = this.cards
        .map((card, index) => (card.id === id && !card.imageUrl ? index : -1))
        .filter((index) => index !== -1);
      indices.forEach((index) => {
        if (index !== -1) {
          this.cards[index].imageUrl = response.sprites.front_default;
        }
      });
    } catch (error) {
      console.error(`Failed to fetch Pokemon ${id}:`, error);
    }
  }

  flipCard(index: number) {
    if (this.lockBoard) return;
    if (this.flippedCards.length === 2) return;
    if (this.cards[index].flipped) return;

    this.cards[index].flipped = true;
    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    this.lockBoard = true;
    const [firstIndex, secondIndex] = this.flippedCards;
    const isMatch = this.cards[firstIndex].id === this.cards[secondIndex].id;

    if (isMatch) {
      this.pairsFound++;
      this.flippedCards = [];
      this.lockBoard = false;
      if (this.pairsFound === this.cards.length / 2) {
        setTimeout(
          () => alert('¡Felicidades! Has encontrado todos los pares.'),
          500
        );
      }
    } else {
      this.errors++;
      setTimeout(() => {
        this.cards[firstIndex].flipped = false;
        this.cards[secondIndex].flipped = false;
        this.flippedCards = [];
        this.lockBoard = false;
      }, 1000);
    }
  }
}
