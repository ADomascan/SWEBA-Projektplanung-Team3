export interface Project {
    _id: string;
    name: string;
    description?: string;
    startDate: Date;
    projectManager:string;
    workPackages?: [{
        package?:{
            wpname:string;
            startDate?:Date;
            duration?:number;
            previousPackage?:string;
            assignee?:string;
            _pid?:string;
        },
    }];
}

export interface Workpackage {

}
