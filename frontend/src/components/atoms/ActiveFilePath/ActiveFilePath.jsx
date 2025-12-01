import { useFileContentStore } from "../../../store/fileContentStore"

export const ActiveFilePath = ()=>{

    const { fileContent } = useFileContentStore()
    const arr = fileContent?.path?.split("\\")
    let idx
    for(let i = 0;i<arr?.length;i++){
        if(arr[i] == "sandbox"){
            idx = i;
            break;
        }
    }
    let str = ""
    for(let i = idx;i<arr?.length;i++){
        str += arr[i]
        if(i!=arr.length-1) str += `  >  `
    }
    
    return (
        <div className="bg-gray-800 text-gray-200 px-4 ">
            {str}
        </div>
    )
}