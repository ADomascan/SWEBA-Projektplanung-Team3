import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project} from "../project";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

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
      package:{
        wpname: "",
        startDate: new Date(),
        duration: 0,
        previousPackage: "",
        assignee: ""
      },
    }],
  });

  public endDate = new Date();

  @Output()
  formValuesChanged = new EventEmitter<Project>();

  @Output()
  formSubmitted = new EventEmitter<Project>();

  workpackageForm: FormGroup = new FormGroup({
    wpname: new FormControl(''),
    durationInDays: new FormControl(''),
    assignee: new FormControl('')
  });

  private currentProject: Project;

  constructor(private fb: FormBuilder) { }

  get id() { return this.workpackageForm.get('_pid')!; }
  get wpname() { return this.workpackageForm.get('wpname')!; }
  get durationInDays() {return this.workpackageForm.get('durationInDays')!;}
  get startDate() { return this.workpackageForm.get('startDate')!; }
  get assignee() { return this.workpackageForm.get('assignee')!; }
  get previousPackage() {return this.workpackageForm.get('previousPackage')!;}


  ngOnInit() {

    console.log(this.initialState.value);

    console.log("Initial State WP Values: " + this.initialState.value.workPackages?.values());


  }

  submitForm() {
    console.log('test on submit: ', this.workpackageForm.value);
    this.formSubmitted.emit(this.workpackageForm.value);
  }


}
