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
            className={`fixed bg-gray-600 w-[120px] z-5 p-1`}
            style={{
                left : x,
                top :  y,
            }}
        >
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full text-sm font-semibold"
                
            >
                New File
            </button>
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full text-sm font-semibold"
                
            >
                New Folder
            </button>
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full text-sm font-semibold"
                onClick={handleFolderDelete}    
            >
                Delete
            </button>
            <button
                className="text-white px-2 py-1 hover:bg-gray-500 w-full text-sm font-semibold"
            >
                Rename
            </button>
        </div>
    )
}