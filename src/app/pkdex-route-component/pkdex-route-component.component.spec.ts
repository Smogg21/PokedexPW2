import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkdexRouteComponentComponent } from './pkdex-route-component.component';

describe('PkdexRouteComponentComponent', () => {
  let component: PkdexRouteComponentComponent;
  let fixture: ComponentFixture<PkdexRouteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PkdexRouteComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PkdexRouteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
