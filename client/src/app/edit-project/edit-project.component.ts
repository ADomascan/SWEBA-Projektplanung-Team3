import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project} from "../project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: BehaviorSubject<Project> = new BehaviorSubject<Project>({
    _id: "",
    name: "",
    projectManager: "",
    startDate: new Date()
  });

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private projectService: ProjectService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.projectService.getProject(id !).subscribe((project) => {
      this.project.next(project);
    });
  }

  editProject(project: Project) {
    console.log(project);
    this.projectService.updateProject(this.project.value._id || '', project)
        .subscribe({
          next: () => {
            this.router.navigate(['/projects']);
          },
          error: (error) => {
            alert('Failed to update project');
            console.error(error);
          }
        })
  }

}
