import { create } from 'zustand'

export const useActiveFileTabStore = create((set,get)=>{
    return {
        activeFileTab : [],
        setActiveFileTab : (incomingActiveFile)=>{
            let found = false
            for(let i = 0;i<get().activeFileTab.length;i++){
                         
                if(get().activeFileTab[i].filePath === incomingActiveFile?.filePath){
                    found = true;
                    break;
                }
            }
            
            if(!found){
                set(state =>({
                    activeFileTab : [...state.activeFileTab,incomingActiveFile]
                }))
            }
            
        },
        setRemoveActiveFile : (incomingArray)=>{
            set({
                activeFileTab : incomingArray
            })
        }
    }
})