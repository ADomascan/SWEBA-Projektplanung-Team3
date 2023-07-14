import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsOverviewComponent} from "./projects-overview/projects-overview.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {EditProjectComponent} from "./edit-project/edit-project.component";
import {CreateWorkpackageComponent} from "./create-workpackage/create-workpackage.component";

const routes: Routes = [
  { path: 'projects', component: ProjectsOverviewComponent },
  { path: 'projects/detail/:id', component: ProjectDetailComponent },
  { path: 'projects/new', component: CreateProjectComponent },
  { path: 'projects/edit/:id', component: EditProjectComponent },
  { path: 'projects/detail/:id/new-wp', component: CreateWorkpackageComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
