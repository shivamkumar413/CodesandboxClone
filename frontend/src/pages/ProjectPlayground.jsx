import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { useEffect } from "react";
import {io} from 'socket.io-client'

function ProjectPlayground (){
        

    const {projectId} = useParams()
    const { setEditorSocket } = useEditorSocketStore()

    useEffect(()=>{
        const editorSocketConnection = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
            query : {
                projectId : projectId,
            }
        })
        setEditorSocket(editorSocketConnection)
    },[setEditorSocket])

    return (
        <>
            Playground
            Project id : {projectId}
            <div className="flex">
                <TreeStructure />
                <EditorComponent />
                
            </div>
            
        </>
    )
}

export default ProjectPlayground;