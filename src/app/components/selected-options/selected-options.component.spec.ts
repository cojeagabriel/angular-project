import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOptionsComponent } from './selected-options.component';

describe('SelectedOptionsComponent', () => {
  let component: SelectedOptionsComponent;
  let fixture: ComponentFixture<SelectedOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedOptionsComponent ],
      imports: [
        MatCardModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
