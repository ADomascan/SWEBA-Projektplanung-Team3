import * as mongodb from "mongodb";
import { Project } from "./project";
 
export const collections: {
   projects?: mongodb.Collection<Project>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("Projectplanner");
   await applySchemaValidation(db);
 
   const projectsCollection = db.collection<Project>("projects");
   collections.projects = projectsCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name"],
           additionalProperties: true,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               description: {
                   bsonType: "string",
                   description: "'description' is a string",
               },
               workPackages: {
                   bsonType: "array",
                   description: "'workPackages' is an array",
                   package:{
                       bsonType: "object",
                       additionalProperties: true,
                       properties: {
                           _pid: {},
                           name: {
                               bsonType: "string",
                               description: "'name' is an array",
                           }
                       }
                   }
               },
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "projects",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("projects", {validator: jsonSchema});
       }
   });
}