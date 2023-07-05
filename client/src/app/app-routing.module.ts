import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsOverviewComponent} from "./projects-overview/projects-overview.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";

const routes: Routes = [
  { path: 'overview', component: ProjectsOverviewComponent },
  { path: 'detail/:id', component: ProjectDetailComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
