import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { FileIcon } from "../../atoms/FileIcon/FileIcon"

export const TreeNode = ({fileFolderData})=>{

    const [visibility,setVisibility] = useState({})

    function toggleVisibility(name){
        setVisibility({
            ...visibility,
            [name] : !visibility[name]
        })
    }

    return(
        (fileFolderData && 
            
            <div className="pl-3 bg-gray-900 border-l border-gray-300">
                {fileFolderData.children ? (

                    <button 
                        className="flex cursor-pointer text-white px-3 py-1 items-center hover:text-blue-300 tranisiton"
                        onClick={()=>toggleVisibility(fileFolderData.name)}
                    >
                        {visibility[fileFolderData.name] ?  <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4"/>}
                        <span className="ml-2">{fileFolderData.name}</span>
                    </button>
                )    
                    : 
                (
                    <div className="flex pl-3 py-1 text-white items-center hover:cursor-pointer hover:text-blue-300 tranistion">
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