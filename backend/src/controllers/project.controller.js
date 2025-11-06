import util from 'util'
import child_process from 'child_process'
import fs from 'fs/promises'
import uuid4 from 'uuid4'

const execPromisified =  util.promisify(child_process.exec)

export const createProjectController = async (req,res)=>{
    
    //create a unique id and then in projects folder create a folder with that id
    const projectId = uuid4()
    console.log("Project id is : ",projectId);
    
    // when we use mkdir with fs hten the command is executed from root directory 
    // so when we do ./projects then we will go in projects directory
    await fs.mkdir(`./projects/${projectId}`)

    //after this call the npm create vite@latest command in the newly created folder 
    const response = execPromisified('npm create vite@latest sandbox -- --template react',{
        cwd : `./projects/${projectId}`
    })


    // const { stdout, stderr } = await execPromisified('npm create vite@latest');
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);

    return res.json({message : 'project created' , data : projectId})
}