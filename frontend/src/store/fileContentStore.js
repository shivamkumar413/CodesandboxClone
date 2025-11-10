import { create } from "zustand";

export const useFileContentStore = create((set)=>{
    return {
        fileContent : "",
        setFileContent : (value)=>{
            set({
                fileContent : value
            })
        }
    }
})