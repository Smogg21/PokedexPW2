import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDelDiaComponent } from './pokemon-del-dia.component';

describe('PokemonDelDiaComponent', () => {
  let component: PokemonDelDiaComponent;
  let fixture: ComponentFixture<PokemonDelDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDelDiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonDelDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
