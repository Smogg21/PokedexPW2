import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonesGridComponent } from './pokemones-grid.component';

describe('PokemonesGridComponent', () => {
  let component: PokemonesGridComponent;
  let fixture: ComponentFixture<PokemonesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonesGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
