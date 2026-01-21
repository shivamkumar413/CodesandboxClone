import {create} from 'zustand'

export const useCreateProjectStore = create((set)=>{
    return{
        currentProjectName : '',
        setCurrentProject : (incomingProjectName)=>{
            set({
                currentProjectName : incomingProjectName
            })
        }
    }
})