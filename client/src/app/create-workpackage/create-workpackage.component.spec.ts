import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkpackageComponent } from './create-workpackage.component';

describe('CreateWorkpackageComponent', () => {
  let component: CreateWorkpackageComponent;
  let fixture: ComponentFixture<CreateWorkpackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWorkpackageComponent]
    });
    fixture = TestBed.createComponent(CreateWorkpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
