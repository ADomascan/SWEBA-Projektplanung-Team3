import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const projectRouter = express.Router();
projectRouter.use(express.json());
 
projectRouter.get("/", async (_req, res) => {
   try {
       const projects = await collections.projects.find({}).toArray();
       res.status(200).send(projects);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

projectRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const project = await collections.projects.findOne(query);
  
        if (project) {
            res.status(200).send(project);
        } else {
            res.status(404).send(`Failed to find an project: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an project: ID ${req?.params?.id}`);
    }
 });

 projectRouter.post("/", async (req, res) => {
    try {
        const project = req.body;
        const result = await collections.projects.insertOne(project);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new project: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new project.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 projectRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const project = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.projects.updateOne(query, { $set: project });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an project: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an project: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an project: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });
 projectRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.projects.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an project: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an project: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an project: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });