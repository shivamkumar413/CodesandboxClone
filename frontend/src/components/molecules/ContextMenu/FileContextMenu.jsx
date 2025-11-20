import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useContextFileMenuStore } from "../../../store/fileContextMenuStore";

export const FileContextMenu = ({
    x,
    y,
    path,
})=>{
    const { setIsOpen,setIsInput,isInput } = useContextFileMenuStore()
    const { editorSocket } = useEditorSocketStore()

    function handleInputVisibility(){
        console.log("Rename clicked")
        const name = path.split("\\").pop()
        console.log(name)
        setIsInput({
            ...isInput,
            [name] : !isInput[name]
        })
    }

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
            className={`fixed bg-gray-600 w-[120px] z-5 p-1 rounded-md`}
            style={{
                left : x,
                top :  y,
            }}
        >
            <button
                className="px-2 py-1 hover:bg-gray-500 text-white w-full hover:cursor-pointer"
                onClick={handleFileDelete}    
            >
                Delete File
            </button>
            <button
                className="px-2 py-1 hover:bg-gray-500 text-white w-full hover:cursor-pointer"
                onClick={()=>handleInputVisibility()}
            >
                Rename File
            </button>
        </div>
    )
}