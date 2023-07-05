import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatIconModule} from '@angular/material/icon';
import {ProjectService} from "../project.service";
import {DataSource} from "@angular/cdk/collections";
import {Project} from "../projects-overview/projects-overview.component";

export interface Workpackage {
  id: number;
  projectid: number;
  name: string;
  duration: number;
}

const ELEMENT_DATA: Workpackage[] = [
  {id: 1, projectid: 1, name: 'Aufgabe 1', duration: 12 },
  {id: 2, projectid: 1, name: 'Aufgabe 2', duration: 5 },
  {id: 3, projectid: 1, name: 'Aufgabe 3', duration: 2 },
  {id: 4, projectid: 1, name: 'Aufgabe 4', duration: 4 },
];

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectDetailComponent  {

  displayedColumns = ['id', 'name', 'duration', 'projectid'];
  dataSource = new MatTableDataSource<Workpackage>(ELEMENT_DATA);
  clickedRows = new Set<Project>();
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Project | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    console.log(this.sort) //not undefined
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  protected readonly DataSource = DataSource;
  protected readonly ELEMENT_DATA = ELEMENT_DATA;

}
