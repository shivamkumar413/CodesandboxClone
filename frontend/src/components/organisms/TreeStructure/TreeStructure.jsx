import { useParams } from "react-router-dom"
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react"
import { TreeNode } from "../../molecules/TreeNode/TreeNode"


export const TreeStructure = ()=>{

    const {treeStructure,setTreeStructure} = useTreeStructureStore()

    const {projectId} = useParams()

    useEffect(()=>{
        if(treeStructure){
            console.log("Tree : ",treeStructure)
        }else{
            setTreeStructure(projectId)
        }
        
    },[treeStructure,setTreeStructure,projectId])

    return(
        <div className="h-screen bg-gray-900">
            <TreeNode fileFolderData={treeStructure} />
        </div>
    )
}