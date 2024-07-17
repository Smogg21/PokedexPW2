import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerunGameComponent } from './pokerun-game.component';

describe('PokerunGameComponent', () => {
  let component: PokerunGameComponent;
  let fixture: ComponentFixture<PokerunGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerunGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokerunGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
