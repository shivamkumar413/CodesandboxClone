import { create } from "zustand";

export const useCreateFileFolderStore = create((set)=>{
    return {
        isCreateFileOpen : {},
        isCreateFolderOpen : {},
        setIsCreateFileOpen : (incomingValue)=>{
            set({
                isCreateFileOpen : incomingValue
            })
        },
        setIsCreateFolderOpen : (incomingValue)=>{
            set({
                isCreateFolderOpen : incomingValue
            })
        }
    }
})