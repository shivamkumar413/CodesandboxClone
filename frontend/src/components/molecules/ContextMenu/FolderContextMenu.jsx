import { useEditorSocketStore } from "../../../store/editorSocketStore"
import { useContextFolderMenuStore } from "../../../store/folderContextMenuStore"

export const FolderContextMenu = ({x,y,path})=>{

    const {editorSocket} = useEditorSocketStore()
    const {setIsOpen} = useContextFolderMenuStore()
    function handleFolderDelete(e){
        e.preventDefault()
        console.log("Deleting folder at ",path);
        editorSocket?.emit("deleteFolder",{
            pathToFileOrFolder : path
        })
    }
    return(
        <div 
            onMouseLeave={()=>{
                setIsOpen(false)
            }}
            className={`fixed bg-gray-600 w-[120px] z-5 p-1 rounded-md`}
            style={{
                left : x,
                top :  y,
            }}
        >
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full hover:cursor-pointer"    
            >
                New File
            </button>
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full hover:cursor-pointer"
                
            >
                New Folder
            </button>
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full hover:cursor-pointer"
                onClick={handleFolderDelete}    
            >
                Delete
            </button>
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full hover:cursor-pointer"
            >
                Rename
            </button>
        </div>
    )
}