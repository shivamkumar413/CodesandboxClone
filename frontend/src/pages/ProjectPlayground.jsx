import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { useEffect } from "react";
import {io} from 'socket.io-client'
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTermial";


function ProjectPlayground (){
        

    const {projectId : projectIdFromUrl} = useParams()
    const { setEditorSocket } = useEditorSocketStore()


    
    useEffect(()=>{
        if(projectIdFromUrl){
            
            const editorSocketConnection = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
                query : {
                    projectId : projectIdFromUrl,
                }
            })
            
            setEditorSocket(editorSocketConnection)
        }
    },[setEditorSocket])

    return (
        <>
            Playground
            Project id : {projectIdFromUrl}
            <div className="flex">
                <TreeStructure projectId={projectIdFromUrl} />
                <div>
                    <EditorComponent />
                    <BrowserTerminal />
                </div>
                
                
            </div>
            
        </>
    )
}

export default ProjectPlayground;