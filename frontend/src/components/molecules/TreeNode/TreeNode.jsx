import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { FileIcon } from "../../atoms/FileIcon/FileIcon"
import { getFileData } from "../../../apis/projects"
import { useFileContentStore } from "../../../store/fileContentStore"
import { useEditorSocketStore } from "../../../store/editorSocketStore"

export const TreeNode = ({fileFolderData})=>{

    const [visibility,setVisibility] = useState({})
    const { setFileContent } = useFileContentStore()
    const {editorSocket} = useEditorSocketStore()

    function toggleVisibility(name){
        setVisibility({
            ...visibility,
            [name] : !visibility[name]
        })
    }

    // async function fetchFileData(filePath){
    //     const response = await getFileData(filePath)
    //     setFileContent(response)
    // }

    function handleFileClick(fileFolderData){
        console.log("Clicked on : ",fileFolderData)
        editorSocket.emit("readFile",{
            pathToFileOrFolder : fileFolderData.path
        })
    }

    return(
        (fileFolderData && 
            
            
            
            <div className="pl-3 border-l border-gray-300">
                {fileFolderData.children ? (

                    <button 
                        className="flex w-full cursor-pointer text-white px-3 py-1 items-center hover:text-blue-300 tranisiton"
                        onClick={()=>toggleVisibility(fileFolderData.name)}
                    >
                        {visibility[fileFolderData.name] ?  <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4"/>}
                        <span className="ml-2">{fileFolderData.name}</span>
                    </button>
                )    
                    : 
                (
                    <div
                        className="flex pl-5 py-1 text-white items-center hover:cursor-pointer hover:text-blue-300 tranistion"
                        onClick={()=>handleFileClick(fileFolderData)}
                    >
                        <FileIcon extension={fileFolderData.name.split(".").pop()} />
                        <span className="ml-2">{fileFolderData.name}</span>
                    </div>
                )}

                {visibility[fileFolderData.name] && fileFolderData.children && (
                    
                    fileFolderData.children.map((child)=>(
                        
                        <TreeNode 
                            fileFolderData={child}
                            key={child.name}
                        />
                    ))
                )
                    
                }
            
            </div>

            
                
            
            
        )
        
    )
}