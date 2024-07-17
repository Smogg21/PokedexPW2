import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMemoryGameComponent } from './pokemon-memory-game.component';

describe('PokemonMemoryGameComponent', () => {
  let component: PokemonMemoryGameComponent;
  let fixture: ComponentFixture<PokemonMemoryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMemoryGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonMemoryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
