import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project} from "../project";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  constructor(
      private router: Router,
      private projectService: ProjectService
  ) { }

  createProject(project: Project) {
      console.log("a: " + project._id + " b: " + project.workPackages)
    this.projectService.createProject(project)
        .subscribe({
          next: () => {
            this.router.navigate(['/projects']);
          },
          error: (error) => {
            alert("Failed to create project");
            console.error(error);
          }
        });
  }

}
