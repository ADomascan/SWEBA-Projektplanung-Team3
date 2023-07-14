export interface Project {
    _id: string;
    name: string;
    description?: string;
    startDate: Date;
    projectManager:string;
    workPackages?: [{
        workpackage?:[{
            name:string;
            startDate?:Date;
            duration?:number;
            previousPackage?:string;
            assignee?:string;
            _pid?:string;
        }],
    }];
}
