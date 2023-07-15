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
            package:{
                wpname: "",
                startDate: new Date(),
                duration: 0,
                previousPackage: "",
                assignee: "",
                _pid: "",
            },
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

        this.projectService.getProject(id !).subscribe((project: Project) => {
            console.log("projektdaten: ", project)
            this.project.next(project);
            console.log('After res: ', this.project);
        });
    }


    // was hier ankommt ist ein workpackage mit name assignee und durationInDays
    createWorkpackage(workpackage:  any) {
        if (this.project.value.workPackages == undefined) {
            this.project.value["workPackages"] = [{
                package:
                    {
                        wpname: workpackage.wpname,
                        startDate: new Date(),
                        duration: workpackage.durationInDays,
                        previousPackage: "",
                        assignee: workpackage.assignee,
                        _pid: "",
                    }
            }];
        } else {
            //const oldwps = this.project.value.workPackages;
            this.project.value.workPackages.push(
                {
                    package:
                        {
                            wpname: workpackage.wpname,
                            startDate: new Date(),
                            duration: workpackage.durationInDays,
                            previousPackage: "",
                            assignee: workpackage.assignee,
                            _pid: "",
                        }
                }
            );
        }

        const projectToUpdate = {
            id: this.project.value._id,
            name: this.project.value.name,
            startDate: this.project.value.startDate,
            projectManager: this.project.value.projectManager,
            workPackages: this.project.value.workPackages
        }


        this.projectService.updateProject(this.project.value._id || '', projectToUpdate)
            .subscribe({
                next: () => {
                    this.router.navigate(['/projects/detail/', this.project.value._id]);
                },
                error: (error) => {
                    alert('Failed to update project');
                    console.error(error);
                }
            })
    }

}
