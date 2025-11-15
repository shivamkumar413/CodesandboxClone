import { create } from "zustand";

export const useContextFolderMenuStore = create((set)=>{
    return {
        x : null,
        y : null,
        isOpen : false,
        folder : null,
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
        }
    }
})