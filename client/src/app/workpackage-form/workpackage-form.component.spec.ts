import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackageFormComponent } from './workpackage-form.component';

describe('WorkpackageFormComponent', () => {
  let component: WorkpackageFormComponent;
  let fixture: ComponentFixture<WorkpackageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkpackageFormComponent]
    });
    fixture = TestBed.createComponent(WorkpackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
