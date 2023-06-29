export interface Project {
    name: string;
   description?: string;
   startDate?: Date;
   projectManager?:string;
workPackages?: [{
    package?:[{
        name:string;
        startDate?:Date;
        duration?:number;
        previousPackage?:string;
        nextPackage?:string;
        assignee?:string;
        _pid?:string;
    }],
}];
   _id?: string;
}
