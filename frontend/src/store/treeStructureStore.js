import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTree } from "../apis/projects";


export const useTreeStructureStore = create((set,get)=>{
    const queryClient  = new QueryClient()

    return {
        projectId : null,
        treeStructure : null,
        setProjectId : (incomingProjectId)=>{
            set({
                projectId : incomingProjectId
            })
        },
        setTreeStructure : async () =>{
            const id = get().projectId
            console.log("Id at tree store",id)
            const data  = await queryClient.fetchQuery({
                queryKey : [`projectTree-${id}`],
                queryFn : () => getProjectTree(id)
            })

            console.log(data);
            set({
                treeStructure : data
            })
        }

        
    }
})