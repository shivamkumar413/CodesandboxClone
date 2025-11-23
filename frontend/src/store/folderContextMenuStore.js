import { create } from "zustand";

export const useContextFolderMenuStore = create((set)=>{
    return {
        x : null,
        y : null,
        isOpen : false,
        folder : null,
        isInputFolder : {},
        setX : (incomingX)=>{
            set({
                x : incomingX
            })
        },
        setY : (incomingY)=>{
            set({
                y : incomingY
            })
        },
        setIsOpen : (incomingIsOpen)=>{
            set({
                isOpen : incomingIsOpen
            })
        },
        setFolder : (incomingFile)=>{
            set({
                folder : incomingFile
            })
        },
        setIsInputFolder : (incomingFolder)=>{
            set({
                isInputFolder : incomingFolder
            })
        }
    }
})