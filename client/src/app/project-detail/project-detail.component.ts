import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Project} from "../project";
import {BehaviorSubject} from "rxjs";
import {ProjectService} from "../project.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment/moment";
import * as shape from 'd3-shape';


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
      package:{
        wpname: "",
        startDate: new Date(),
        duration: 0,
        previousPackage: "",
        assignee: "",
        _pid: "",
      },
    }],

  });

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private projectService: ProjectService,
  ) { }

  allWorkpackages: any;
  displayedColumns = ['wpname', 'duration', 'previousPackage', 'assignee'];
  dataSource = new MatTableDataSource<any>;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Project | null;
  calculatedEndDate: any;
  startDate: any;
  graph: any = {nodes: [], links: []};
  curve = shape.curveBundle.beta(1);
  layout = "dagreCluster";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.projectService.getProject(id !).subscribe((data) => {
      this.allWorkpackages = data.workPackages?.map(el => el.package);
      this.dataSource = new MatTableDataSource(this.allWorkpackages);
      this.showGraph();
      this.calcEndDate();
      this.startDate = moment(this.project.value.startDate).format("DD.MM.YYYY");
      this.project.next(data);
      console.log('data workpackages', this.project.value.workPackages);
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('project detail workpackages', this.project.value.workPackages);
  }

  public convertDate(date: Date) {
    return moment(date).format('DD.MM.YYYY');
  }

  public calcEndDate() {
    let endDate = moment(this.project.value.startDate);
    if (this.allWorkpackages != undefined) {
      for (let i=0; i < this.allWorkpackages.length; i++) {
        console.log('Dur: ', this.allWorkpackages[i].duration);
        endDate.add( 'days', this.allWorkpackages[i].duration);
      }
    }
    this.calculatedEndDate = endDate.format("DD.MM.YYYY");
  }

  showGraph() {
    if (this.allWorkpackages != undefined) {
      console.log("yes");
      for (let i=0; i < this.allWorkpackages.length; i++) {
        this.graph.nodes.push(
            {
              id: this.allWorkpackages[i]._id,
              label: this.allWorkpackages[i].name,
              position: 'x' + i
            }
        )
      }
      console.log('Graph: ', this.graph.nodes);
    }
    this.graph.links = [];
  }


  public deleteWorkpackage(element: any) {
    for (let i=0; i < this.allWorkpackages.length; i++) {
      if (this.allWorkpackages[i].id == element.id) {
        this.allWorkpackages.splice(i, i+1);
      }
    }
    this.updateProject();
  }

  public updateProject() {

    const projectToUpdate = {
      id: this.project.value._id,
      name: this.project.value.name,
      startDate: this.project.value.startDate,
      projectManager: this.project.value.projectManager,
      workPackages: this.allWorkpackages
    }


    this.projectService.updateProject(this.project.value._id || '', projectToUpdate)
        .subscribe({
          next: () => {
            document.location.reload();
            this.router.navigate(['projects/detail/', this.project.value._id]);
          },
          error: (error) => {
            alert('Failed to update project');
            console.error(error);
          }
        })
  }

}
