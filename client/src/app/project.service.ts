import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Project } from './project';
 
@Injectable({
 providedIn: 'root'
})
export class ProjectService {
 private url = 'http://localhost:5200';
 public projects$: Subject<Project[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshProjects() {
   this.httpClient.get<Project[]>(`${this.url}/projects`)
     .subscribe(projects => {
         console.log(projects);
       this.projects$.next(projects);
     });
 }
 
 getProjects(): Subject<Project[]> {
   this.refreshProjects();
   return this.projects$;
 }
 
 getProject(id: string): Observable<Project> {
   return this.httpClient.get<Project>(`${this.url}/projects/${id}`);
 }
 
 createProject(project: Project): Observable<string> {
   return this.httpClient.post(`${this.url}/projects`, project, { responseType: 'text' });
 }
 
 updateProject(id: string, project: any): Observable<string> {
   return this.httpClient.put(`${this.url}/projects/${id}`, project, { responseType: 'text' });
 }
 
 deleteProject(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/projects/${id}`, { responseType: 'text' });
 }
}