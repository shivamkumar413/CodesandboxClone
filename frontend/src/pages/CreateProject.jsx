import { useNavigate } from "react-router-dom"
import { useCreateProject } from "../hooks/apis/mutation/useCreateProject"

export const CreateProject = ()=>{

    const navigate = useNavigate()
    const { mutateAsync ,isPending } = useCreateProject()
    
    async function handleCreateProject(){
        try {
            const response =  await mutateAsync()
            navigate(`/project/${response.data}`)
        } catch (error) {
            console.log("Error creating project : ",error)
        }
    }

    return(
        <>
            <h1>Create Project</h1>
            <div
                className="border mx-2 bg-gray-800 text-white border-gray-300 px-2 py-1 w-30 h-30 rounded-md flex flex-col items-center hover:cursor-pointer shadow-lg"
                onClick={handleCreateProject}
            >   
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" 
                    alt="" 
                    className="w-20 h-20 mt-1"
                />
                <span className="mt-1">React (JS)</span>
            </div>

            {isPending && 
                <p> Creating Project... </p>
            }
        </>
    )
}