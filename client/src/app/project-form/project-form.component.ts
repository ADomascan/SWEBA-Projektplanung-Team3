import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Project} from "../project";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})

export class ProjectFormComponent implements OnInit {

  @Input()
  initialState: BehaviorSubject<Project> = new BehaviorSubject<Project>({
    _id: "",
    name: "",
    projectManager: "",
    startDate: new Date()
  });

  @Output()
  formValuesChanged = new EventEmitter<Project>();

  @Output()
  formSubmitted = new EventEmitter<Project>();

  projectForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get id() { return this.projectForm.get('_id')!; }
  get name() { return this.projectForm.get('name')!; }
  get startDate() { return this.projectForm.get('startDate')!; }
  get projectManager() { return this.projectForm.get('projectManager')!; }

  ngOnInit() {
    this.initialState.subscribe(project => {
      console.log("Id: " + project._id);
      this.projectForm = this.fb.group({
        id: [project._id],
        name: [ project.name ],
        startDate: [ project.startDate],
        projectManager: [ project.projectManager ]
      });
    });


    this.projectForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }


  submitForm() {
    this.formSubmitted.emit(this.projectForm.value);
  }


}
