import { useActiveFileTabStore } from "../../../store/activeFileTabStore"
import { FileIcon } from "../FileIcon/FileIcon"
import { useFileContentStore } from "../../../store/fileContentStore"

export const ActiveFileChip = ()=>{

    const { activeFileTab,setRemoveActiveFile } = useActiveFileTabStore()
    const { setFileContent } = useFileContentStore()

    function handleActiveTabClick(ele){    
        setFileContent(ele?.fileValue,ele?.filePath,ele?.fileExtension)
        for(let i = 0;i<activeFileTab.length;i++){
            if(ele?.filePath === activeFileTab[i].filePath) 
                activeFileTab[i].isActive = true;
            else 
                activeFileTab[i].isActive = false
        }
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
        if(activeFileTab[idx].isActive){
            if(idx!=0){
                setFileContent(activeFileTab[idx-1]?.fileValue,activeFileTab[idx-1]?.filePath,activeFileTab[idx-1]?.fileExtension)
                activeFileTab[idx-1].isActive = true
            }   
            else{
                setFileContent(activeFileTab[idx+1]?.fileValue,activeFileTab[idx+1]?.filePath,activeFileTab[idx+1]?.fileExtension)
                activeFileTab[idx+1].isActive = true
            }
            
        }
        
    }

    function handleActiveCSS(ele){
        if(ele.isActive) return "border-y-2 border-gray-200 bg-gray-900"
        else return "border-r border-gray-800 bg-[#094771]"
    }

    const arr = activeFileTab?.map((ele,idx)=>{
        return(
            <>
                <div 
                    className={`px-3 py-2 ${handleActiveCSS(ele)} flex bg-[#094771] items-center justify-between text-white text-center  hover:cursor-pointer`}
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