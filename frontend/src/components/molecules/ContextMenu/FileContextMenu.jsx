import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useContextFileMenuStore } from "../../../store/fileContextMenuStore";

export const FileContextMenu = ({
    x,
    y,
    path,
})=>{
    const {setIsOpen} = useContextFileMenuStore()
    const { editorSocket } = useEditorSocketStore()


    function handleFileDelete(e){
        e.preventDefault();
        console.log("Deleting file at ",path);
        editorSocket.emit("deleteFile",{
            pathToFileOrFolder : path
        })
    }
    
    return(
        <div 
            onMouseLeave={()=>{
                setIsOpen(false)
            }}
            className={`fixed bg-gray-400 w-[120px] z-5 p-1`}
            style={{
                left : x,
                top :  y,
            }}
        >
            <button
                className="px-2 py-1 hover:bg-gray-600 w-full"
                onClick={handleFileDelete}    
            >
                Delete File
            </button>
            <button
                className="px-2 py-1 hover:bg-gray-600 w-full"
            >
                Rename File
            </button>
        </div>
    )
}