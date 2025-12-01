import { create } from 'zustand'
import { useFileContentStore } from './fileContentStore'
import { useTreeStructureStore } from './treeStructureStore'
import { useActiveFileTabStore } from './activeFileTabStore'
import { usePortStore } from './portStore'

export const useEditorSocketStore = create ((set)=>({
        editorSocket : null,
        setEditorSocket : (incomingSocket)=>{
            const fileContentSetter = useFileContentStore.getState().setFileContent
            const treeStructureSetter = useTreeStructureStore.getState().setTreeStructure
            const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab
            const portSetter = usePortStore.getState().setPort
            
            incomingSocket?.on("readFileSuccess",(data)=>{
                
                const extension = data?.path?.split(".").pop()
                console.log(extension)
                console.log("Read file success : ",data)
                fileContentSetter(data?.value,data?.path,extension)
                
                activeFileTabSetter({
                    filePath : data?.path,
                    fileValue : data?.value,
                    fileExtension : extension,
                    isActive : true,
                })
                 
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
            incomingSocket?.on("getPortSuccess",({port})=>{
                console.log(port)
                portSetter(port)
            })
            set({
                editorSocket : incomingSocket
            })
        }
    }
    
))