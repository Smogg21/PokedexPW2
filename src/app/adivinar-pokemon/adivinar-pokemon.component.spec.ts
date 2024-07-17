import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdivinarPokemonComponent } from './adivinar-pokemon.component';

describe('AdivinarPokemonComponent', () => {
  let component: AdivinarPokemonComponent;
  let fixture: ComponentFixture<AdivinarPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdivinarPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdivinarPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
