import { create } from 'zustand'
import { useFileContentStore } from './fileContentStore'
import { useTreeStructureStore } from './treeStructureStore'

export const useEditorSocketStore = create ((set)=>({
        editorSocket : null,
        setEditorSocket : (incomingSocket)=>{
            const fileContentSetter = useFileContentStore.getState().setFileContent
            const treeStructureSetter = useTreeStructureStore.getState().setTreeStructure
            
            incomingSocket?.on("readFileSuccess",(data)=>{
                const extension = data?.path?.split(".").pop()
                console.log(extension)
                console.log("Read file success : ",data)
                fileContentSetter(data?.value,data?.path,extension)
            })

            incomingSocket?.on("deleteFileSuccess",()=>{
                console.log("Inside file success register emit")
                treeStructureSetter()
            })

            incomingSocket?.on("deleteFolderSuccess",()=>{
                treeStructureSetter()
            })
            
            incomingSocket?.on("renameFileSuccess",()=>{
                treeStructureSetter()
            })
            incomingSocket?.on("createFileSuccess",()=>{
                treeStructureSetter()
            })
            incomingSocket?.on("createFolderSuccess",()=>{
                treeStructureSetter()
            })
            set({
                editorSocket : incomingSocket
            })
        }
    }
    
))