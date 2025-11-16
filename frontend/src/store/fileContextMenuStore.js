import { create } from "zustand";

export const useContextFileMenuStore = create((set)=>{
    return {
        x : null,
        y : null,
        isOpen : false,
        file : null,
        isInput : {},
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
        setFile : (incomingFile)=>{
            set({
                file : incomingFile
            })
        },
        setIsInput : (incomingIsInput)=>{
            set({
                isInput : incomingIsInput
            })
        }
    }
})