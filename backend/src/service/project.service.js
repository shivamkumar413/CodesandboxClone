import uuid4 from "uuid4";
import fs from 'fs/promises'
import { PROJECT_COMMAND } from '../config/server.config.js'
import { execPromisified } from "../utils/exec.utils.js";
import path from "path";
import { directoryTree } from "../utils/directoryTree.utils.js";

export const createProjectService = async (projectName)=>{
    //create a unique id and then in projects folder create a folder with that id
        const projectId = uuid4()
        console.log("Project id is : ",projectId);
        
        // when we use mkdir with fs hten the command is executed from root directory 
        // so when we do ./projects then we will go in projects directory
        await fs.mkdir(`./projects/${projectId}`)
        let command = PROJECT_COMMAND + projectName
        console.log("command : ",command)
        //after this call the npm create vite@latest command in the newly created folder 
        const response =  execPromisified(command,{
            cwd : `./projects/${projectId}`
        })
        
        return projectId;
}

export const getProjectTreeService = async (projectId)=>{
    const projectPath = path.resolve(`./projects/${projectId}`)
    const tree = directoryTree(projectPath);
    return tree;
}

export const getFileContentService = async({filePath})=>{
    try {
        const data = await fs.readFile(`${filePath}`,{encoding : 'utf8'})
        return data
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}