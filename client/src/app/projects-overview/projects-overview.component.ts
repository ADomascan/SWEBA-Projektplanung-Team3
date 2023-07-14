import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";
import {ProjectService} from "../project.service";
import {Project} from "../project";
import * as moment from "moment";


/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
    selector: 'app-projects-overview',
    templateUrl: './projects-overview.component.html',
    styleUrls: ['./projects-overview.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class ProjectsOverviewComponent implements OnInit, AfterViewInit {

    projects$: Observable<Project[]> = new Observable();

    constructor(
        private projectService: ProjectService
    ) {
    }

    displayedColumns = ['name', 'startDate', 'projectManager'];
    dataSource = new MatTableDataSource<Project>;
    columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    expandedElement: Project | null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.fetchProjects();
        this.projects$.subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        console.log('on init', this.dataSource.paginator);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('after view init', this.dataSource.paginator);
    }

    deleteProject(id: string) {
        this.projectService.deleteProject(id).subscribe({
            next: () => this.fetchProjects()
        });
    }

    private fetchProjects(): void {
        this.projects$ = this.projectService.getProjects();
    }

    public convertDate(date: Date) {
        return moment(date).format('DD.MM.YYYY');
    }


}