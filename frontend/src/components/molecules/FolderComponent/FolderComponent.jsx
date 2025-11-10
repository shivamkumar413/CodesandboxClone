import { useState } from "react"
import { ChevronRight, ChevronDown, Folder} from 'lucide-react';
import { FileIcon } from "../../atoms/FileIcon/FileIcon";

export const FolderComponent = ({data})=>{


    return(
        <>
            {data.map((ele)=>{
                
                const [displayValue,setDisplayValue] = useState(false)
                return(
                    <div 
                        className="pl-6 border-l border-gray-300"
                        key={ele.id}>
                        
                            {
                                ele.type === 'directory' 
                                    ? 
                                    <div className={`flex items-center justify-between px-3 py-1 my-1 w-fit rounded-md transition-all duration-200 cursor-pointer
                                        ${displayValue ? "bg-blue-200" : "bg-blue-100 hover:bg-blue-200"}
                                    `}>
                                        
                                        <button className="mr-5 hover:cursor-pointer"
                                            onClick={()=>setDisplayValue(!displayValue)}
                                        >
                                            {displayValue ?  <ChevronDown /> : <ChevronRight />}
                                        </button>
                                         
                                        {ele.name + "/" }
                                    </div>   
                                    : 
                                <div className="flex items-center pl-8 py-1 text-white hover:text-blue-300 transition">
                                    <FileIcon extension={ele.name.split(".").pop()} />
                                    <span className="ml-2">{ele.name}</span>
                                </div>
                            
                            }
                        
                        
                        {/* <div className={`${cssHanlder()}`}> */}
                            {ele.type == 'directory' && ele.children && displayValue &&
                                <div className="ml-4 border-l border-gray-200">
                                <FolderComponent data={ele.children} />
                                </div>
                                }
                                
                        {/* </div> */}
                        
                    </div>
                )
            })}
        </>
    )
}