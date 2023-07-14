import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project} from "../project";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-workpackage-form',
  templateUrl: './workpackage-form.component.html',
  styleUrls: ['./workpackage-form.component.css']
})
export class WorkpackageFormComponent {


  @Input()
  initialState: BehaviorSubject<Project> = new BehaviorSubject<Project>({
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

  public endDate = new Date();

  @Output()
  formValuesChanged = new EventEmitter<Project>();

  @Output()
  formSubmitted = new EventEmitter<Project>();

  workpackageForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get id() { return this.workpackageForm.get('_pid')!; }
  get name() { return this.workpackageForm.get('name')!; }
  get duration() {return this.workpackageForm.get('duration')!;}
  get startDate() { return this.workpackageForm.get('startDate')!; }
  get assignee() { return this.workpackageForm.get('assignee')!; }
  get previousPackage() {return this.workpackageForm.get('previousPackage')!;}

  /*anpassen*/
  ngOnInit() {
    this.initialState.subscribe(project => {
      console.log("Id: " + project.workPackages);
      this.workpackageForm = this.fb.group({
        id: [project],
        name: [ project.workPackages],
        /*name: [ project.name ],
        startDate: [ project.startDate],
        projectManager: [ project.projectManager ]
         */
      });
    });


    this.workpackageForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.workpackageForm.value);
  }

  calculateEnddate() {

  }

}
