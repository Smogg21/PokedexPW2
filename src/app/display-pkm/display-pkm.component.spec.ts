import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPkmComponent } from './display-pkm.component';

describe('DisplayPkmComponent', () => {
  let component: DisplayPkmComponent;
  let fixture: ComponentFixture<DisplayPkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPkmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
