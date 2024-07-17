import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSearchComponent } from './pokemon-search.component';

describe('PokemonSearchComponent', () => {
  let component: PokemonSearchComponent;
  let fixture: ComponentFixture<PokemonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
