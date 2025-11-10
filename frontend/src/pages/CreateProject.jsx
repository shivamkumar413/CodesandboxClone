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
            <button
                className="bg-blue-200 px-2 py-1"
                onClick={handleCreateProject}
            >
                Create Project
            </button>

            {isPending && 
                <p> Creating Project... </p>
            }
        </>
    )
}