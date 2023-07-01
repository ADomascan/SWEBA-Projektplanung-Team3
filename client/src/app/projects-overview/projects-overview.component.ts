import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface Project {
  position: number;
  name: string;
  startDate: Date;
  projectManager:string;
}

const ELEMENT_DATA: Project[] = [
  {position: 1, name: 'Implementierung CRM-System 1', startDate: new Date("2024-02-01") , projectManager: 'Max Müller'},
  {position: 2, name: 'Implementierung CRM-System 2', startDate: new Date("2023-10-23") , projectManager: 'Max Müller'},
  {position: 3, name: 'Implementierung CRM-System 3', startDate: new Date("2023-07-12") , projectManager: 'Max Müller'},
  {position: 4, name: 'Implementierung CRM-System 4', startDate: new Date("2024-01-09") , projectManager: 'Max Müller'}
];


/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.css'],
  // standalone: true,
  // imports: [MatTableModule, NgIf, NgFor]
})

export class ProjectsOverviewComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'startDate', 'projectManager'];
  dataSource = new MatTableDataSource<Project>(ELEMENT_DATA);
  clickedRows = new Set<Project>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    console.log(this.sort) //not undefined
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}