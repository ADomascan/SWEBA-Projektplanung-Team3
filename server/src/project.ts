import * as mongodb from "mongodb";
 
export interface Project {
   name: string;
   description?: string;
   startDate?: Date;
   projectManager?:string;
workPackages?: [{
    package?:{
        name:string;
        startDate?:Date;
        duration?:number;
        previousPackage?:mongodb.ObjectId;
        assignee?:string;
        _pid?:mongodb.ObjectId;
    },
}];
   _id?: mongodb.ObjectId;
}