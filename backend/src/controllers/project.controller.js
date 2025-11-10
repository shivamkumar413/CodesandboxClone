import { createProjectService, getProjectTreeService , getFileContentService} from "../service/project.service.js"

export const createProjectController = async (req,res)=>{
    
    const projectId = await createProjectService()


    // const { stdout, stderr } = await execPromisified('npm create vite@latest');
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);

    return res.json(
        {
            message : 'project created' , 
            data : projectId
        }
    )
}

export const getProjectTreeController = async (req,res)=>{

    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
        data : tree,
        success : true,
        message : "successfully fetched the data"
    })

}

export const getFileContentController = async (req,res)=>{

    
    try {
        const response = await getFileContentService({
            filePath : req.body.filePath
        });

        return res.status(200).json({
            success : true,
            response : response,
            message : "Successfully fetched file data"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}