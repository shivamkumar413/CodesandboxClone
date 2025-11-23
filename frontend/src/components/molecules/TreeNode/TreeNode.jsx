import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { FileIcon } from "../../atoms/FileIcon/FileIcon"
import { useEditorSocketStore } from "../../../store/editorSocketStore"
import { useContextFileMenuStore } from "../../../store/fileContextMenuStore"
import { useContextFolderMenuStore } from "../../../store/folderContextMenuStore"

export const TreeNode = ({fileFolderData})=>{

    const [visibility,setVisibility] = useState({})
    const {editorSocket} = useEditorSocketStore()
    const [inputValue,setInputValue] = useState(fileFolderData?.name)
    const {
        isInput,
        setIsInput,
        setFile,
        setIsOpen : setFileContextMenuIsOpen,
        setX : setFileContextMenuX,
        setY : setFileContextMenuY

    } = useContextFileMenuStore()

    const {
        isInputFolder,
        setIsInputFolder,
        setFolder,
        setIsOpen : setFolderContextMenuIsOpen,
        setX : setFolderContextMenuX,
        setY : setFolderContextMenuY
    } = useContextFolderMenuStore()

    function toggleVisibility(name){
        setVisibility({
            ...visibility,
            [name] : !visibility[name]
        })
    }

    function handleFileClick(fileFolderData){
        console.log("Clicked on : ",fileFolderData)
        editorSocket.emit("readFile",{
            pathToFileOrFolder : fileFolderData.path
        })
    }

    function handleContextMenu(e,fileFolderData){
        e.preventDefault()
        console.log(e)
        setFile(fileFolderData?.path)
        setFileContextMenuX(e.clientX)
        setFileContextMenuY(e.clientY)
        setFileContextMenuIsOpen(true)
    }

    function handleFolderContextMenu(e,fileFolderData){
        e.preventDefault()
        console.log("Folder right click");
        console.log(fileFolderData?.path);
        
        setFolder(fileFolderData?.path)
        setFolderContextMenuX(e.clientX)
        setFolderContextMenuY(e.clientY)
        setFolderContextMenuIsOpen(true)
        
    }

    function handleEnterClick(fileFolderData){
        const oldName = fileFolderData.name
        const newName = inputValue
        const pathString = fileFolderData?.path
        const pathArray = pathString.split('\\')
        pathArray.pop()
        pathArray.push(newName)
        const modifiedPathString = pathArray.join("\\")

        editorSocket.emit("renameFile",{
            oldPath : pathString,
            newPath : modifiedPathString,
        })

        if(fileFolderData.children){
            setIsInputFolder({
                ...isInputFolder,
                [newName] : !isInputFolder[oldName]
            })
        }else{
            setIsInput({
                ...isInput,
                [newName] : !isInput[oldName]
            })
        }
        
    }

    return(
        <>
        {fileFolderData && 
            
            <div className="pl-3 border-l border-gray-300">
                {fileFolderData.children ? 
                    (
                        isInputFolder[fileFolderData?.name] ?
                            <input 
                                type="text"
                                className="ml-7 px-2 bg-gray-800 text-white outline-none py-1"
                                value={inputValue}
                                onChange={(e)=>{
                                    setInputValue(e.target.value)
                                }}
                                onKeyDown={(e)=>{
                                    if(e.key == 'Enter'){
                                        console.log("Enter clicked")
                                        handleEnterClick(fileFolderData)
                                    }
                                }}
                            />
                            
                            :

                            <button 
                                className="flex w-full cursor-pointer text-white px-3 py-1 items-center hover:text-blue-300 tranisiton"
                                onClick={()=>toggleVisibility(fileFolderData.name)}
                                onContextMenu={(e)=>handleFolderContextMenu(e,fileFolderData)}
                            >
                                {visibility[fileFolderData.name] ?  <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4"/>}
                                <span className="ml-2">{fileFolderData.name}</span>
                            </button>
                    )
                    
                    : 

                    (isInput[fileFolderData?.name] ? 
                        <div className="flex items-center ml-5">
                            <FileIcon extension={fileFolderData.name.split(".").pop()} />
                            <input 
                                type="text"
                                className="ml-2  bg-gray-800 text-white outline-none py-1"
                                value={inputValue}
                                onChange={(e)=>{
                                    console.log(e)
                                    console.log(e.target.value)
                                    setInputValue(e.target.value)
                                }}
                                onKeyDown={(e)=>{
                                    if(e.key == 'Enter'){
                                        console.log("Enter clicked")
                                        handleEnterClick(fileFolderData)
                                    }
                                }}
                            /> 
                        </div>

                            : 

                        <div
                            className="flex pl-5 py-1 text-white items-center hover:cursor-pointer hover:text-blue-300 tranistion"
                            onClick={()=>handleFileClick(fileFolderData)}
                            onContextMenu={(e)=>handleContextMenu(e,fileFolderData)}
                        >
                            <FileIcon extension={fileFolderData.name.split(".").pop()} />
                            <span className="ml-2">{fileFolderData.name}</span>
                        </div>
                    ) 
                    
                }

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

            }
        </>
    )
}