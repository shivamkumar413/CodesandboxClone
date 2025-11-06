import { useMutation } from "@tanstack/react-query"
import { createProjectApi } from "../../../apis/projects"

export const useCreateProject = () =>{
    const { mutateAsync, isSuccess, isPending, error} = useMutation({
        mutationFn : createProjectApi,
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