import { create } from "zustand";

export const useFileContentStore = create((set)=>{
    return {
        fileContent : null,
        setFileContent : (value,path)=>{
            set({
                fileContent : {
                    data : value,
                    path : path
                }
            })
        }
    }
})