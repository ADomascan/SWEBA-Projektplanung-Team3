import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DataSource} from "@angular/cdk/collections";
import {Project} from "../project";
import {BehaviorSubject, Observable} from "rxjs";
import {ProjectService} from "../project.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment/moment";


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
export class ProjectDetailComponent implements OnInit {

  project: BehaviorSubject<Project> = new BehaviorSubject<Project>({
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

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private projectService: ProjectService,
) { }


  displayedColumns = ['name', 'duration', 'previousPackage', 'assignee'];
  dataSource = new MatTableDataSource<any>;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Project | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.projectService.getProject(id !).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.workPackages);
      this.project.next(data);
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('after view init', this.project.value.workPackages);
  }

  public convertDate(date: Date) {
    return moment(date).format('DD.MM.YYYY');
  }


}
