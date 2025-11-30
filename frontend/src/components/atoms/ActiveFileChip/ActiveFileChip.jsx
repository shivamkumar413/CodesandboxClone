import { useActiveFileTabStore } from "../../../store/activeFileTabStore"
import { FileIcon } from "../FileIcon/FileIcon"
import { useFileContentStore } from "../../../store/fileContentStore"

export const ActiveFileChip = ()=>{

    const { activeFileTab,setRemoveActiveFile } = useActiveFileTabStore()
    const { setFileContent } = useFileContentStore()

    function handleActiveTabClick(ele){    
        setFileContent(ele?.fileValue,ele?.filePath,ele?.fileExtension)
    }

    function handleRemoveActiveTab(event,ele){
        event.stopPropagation();
        let idx;
        setRemoveActiveFile(
            activeFileTab.filter((e,i)=>{
                if(e.filePath == ele.filePath) idx = i;
                return e.filePath != ele.filePath
            })
        )
        // console.log(activeFileTab[0].fileValue)
        //to handle edge cases here
        if(idx!=0)
            setFileContent(activeFileTab[idx-1]?.fileValue,activeFileTab[idx-1]?.filePath,activeFileTab[idx-1]?.fileExtension)
        else
            setFileContent(activeFileTab[idx+1]?.fileValue,activeFileTab[idx+1]?.filePath,activeFileTab[idx+1]?.fileExtension)
    }

    const arr = activeFileTab?.map((ele,idx)=>{
        return(
            <>
                <div 
                    className="px-3 py-2 flex items-center justify-between bg-gray-900 text-white text-center border-r border-gray-200 hover:cursor-pointer"
                    key={idx}
                    onClick={()=>handleActiveTabClick(ele)}
                >
                    <div className="mx-2">
                        <FileIcon extension={ele.filePath.split("\\").pop().split(".").pop()} />
                    </div>
                    
                    <span>{ele.filePath.split("\\").pop()}</span>
                    <span 
                        className="ml-2 hover:bg-slate-700 px-1 rounded-md transition-all z-10"
                        onClick={(e)=>handleRemoveActiveTab(e,ele)}
                    >
                        X
                    </span>
                </div>
            </>
        )
    })
    return(
        <div className="flex">
            {arr}
        </div>
    )
}