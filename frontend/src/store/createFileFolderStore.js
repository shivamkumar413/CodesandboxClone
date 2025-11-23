import { create } from "zustand";

export const useCreateFileFolderStore = create((set)=>{
    return {
        isCreateFileOpen : {},
        setIsCreateFileOpen : (incomingValue)=>{
            set({
                isCreateFileOpen : incomingValue
            })
        }
    }
})