import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/* vielleicht lässt sich dieser Test irgendwie implementieren */
/* 
import {ProjectService} from './app/project.service.js';

const dbEntry = {
      name: "Test Project",
   description: "First test project",
   startDate: '2023-07-01',
   projectManager:"Anna",
workPackages: [{
    package:[{
        name:"Package1",
        startDate:'2023-07-03',
        duration:20,
    }],
}],
}
;

createProject(dbEntry).console.log();
 */