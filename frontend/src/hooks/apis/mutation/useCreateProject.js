import { useMutation } from "@tanstack/react-query"
import { createProjectApi } from "../../../apis/projects"
import { useCreateProjectStore } from "../../../store/createProjectStore"

export const useCreateProject = () =>{
    const { currentProjectName } = useCreateProjectStore()
    const { mutateAsync, isSuccess, isPending, error} = useMutation({
        mutationFn : ()=>createProjectApi(currentProjectName),
        onSuccess : (data)=>{
            console.log("project created successfully : ",data);
            
        },
        onError : ()=>{
            console.log("Error creating project")
        }
    })

    return {
        mutateAsync,
        isPending,
        isSuccess,
        error
    }
}