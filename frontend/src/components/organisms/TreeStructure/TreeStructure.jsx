import { useParams } from "react-router-dom"
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react"
import { TreeNode } from "../../molecules/TreeNode/TreeNode"
import { useContextFileMenuStore } from "../../../store/fileContextMenuStore"
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu"
import { useContextFolderMenuStore } from "../../../store/folderContextMenuStore"
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu"
import { Allotment } from "allotment";
import "allotment/dist/style.css";


export const TreeStructure = ()=>{

    const {treeStructure,setTreeStructure,setProjectId} = useTreeStructureStore()
    const {
        file,
        x : fileContextX,
        y : fileContextY,
        isOpen : isFileContextOpen} = useContextFileMenuStore()

    const { 
        folder ,
        x : folderContextX,
        y : folderContextY,
        isOpen : isFolderContextOpen
    } = useContextFolderMenuStore()
     
    const {projectId} = useParams()

    useEffect(()=>{
        if(treeStructure){

            console.log("Tree : ",treeStructure)
        }else{
            setProjectId(projectId)
            setTreeStructure()
        }
        
    },[treeStructure,setTreeStructure,projectId])

    return(
        <>
        {isFileContextOpen && fileContextX && fileContextY && 
            <FileContextMenu 
                x={fileContextX} 
                y={fileContextY}
                path={file}
            />
        }
        {
            isFolderContextOpen && folderContextX && folderContextY && 
            <FolderContextMenu
                x={folderContextX}
                y={folderContextY}
                path={folder}
            />
        }
            
            <div className="h-screen  bg-gray-950 border-r border-gray-200">
                <TreeNode fileFolderData={treeStructure} />
            </div>
            
            
        </>
    )
}