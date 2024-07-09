import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponentComponent } from './inicio-component.component';

describe('InicioComponentComponent', () => {
  let component: InicioComponentComponent;
  let fixture: ComponentFixture<InicioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
