import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeRunComponent } from './poke-run.component';

describe('PokeRunComponent', () => {
  let component: PokeRunComponent;
  let fixture: ComponentFixture<PokeRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeRunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
