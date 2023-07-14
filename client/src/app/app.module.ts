import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsOverviewComponent } from './projects-overview/projects-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";
import {CdkTableModule} from "@angular/cdk/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {NgxGraphModule} from "@swimlane/ngx-graph";
import { ProjectFormComponent } from './project-form/project-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { CreateWorkpackageComponent } from './create-workpackage/create-workpackage.component';
import { WorkpackageFormComponent } from './workpackage-form/workpackage-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsOverviewComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
    CreateProjectComponent,
    EditProjectComponent,
    CreateWorkpackageComponent,
    WorkpackageFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    NgxGraphModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
