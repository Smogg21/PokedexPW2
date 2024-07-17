import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRouteCompoonentComponent } from './grid-route-compoonent.component';

describe('GridRouteCompoonentComponent', () => {
  let component: GridRouteCompoonentComponent;
  let fixture: ComponentFixture<GridRouteCompoonentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridRouteCompoonentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridRouteCompoonentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
