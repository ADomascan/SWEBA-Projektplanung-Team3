import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project} from "../project";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-create-workpackage',
  templateUrl: './create-workpackage.component.html',
  styleUrls: ['./create-workpackage.component.css']
})
export class CreateWorkpackageComponent {

    project: BehaviorSubject<Project> = new BehaviorSubject<Project>({
        _id: "",
        name: "",
        projectManager: "",
        startDate: new Date(),
        workPackages:  [{
            workpackage:[{
                name: "",
                startDate: new Date(),
                duration: 0,
                previousPackage: "",
                assignee: "",
                _pid: "",
            }],
        }],
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

  /*anpassen*/

    createWorkpackage(project: Project) {
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
