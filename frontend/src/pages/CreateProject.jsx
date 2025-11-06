import { useCreateProject } from "../hooks/apis/mutation/useCreateProject"

export const CreateProject = ()=>{

    const { mutateAsync ,isPending } = useCreateProject()
    async function handleCreateProject(){
        try {
             await mutateAsync()
             console.log("Now we should redirect to the editor page")
        } catch (error) {
            console.log("Error creating project : ",error)
        }
    }

    return(
        <>
            <h1>Create Project</h1>
            <button
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