import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { useEffect } from "react";
import {io} from 'socket.io-client'
import { useTreeStructureStore } from "../store/treeStructureStore";

function ProjectPlayground (){
        

    const {projectId : projectIdFromUrl} = useParams()
    const { setEditorSocket } = useEditorSocketStore()
    const { setProjectId } = useTreeStructureStore()

    
    useEffect(()=>{
        const editorSocketConnection = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
            query : {
                projectId : projectIdFromUrl,
            }
        })
        
        setEditorSocket(editorSocketConnection)
    },[setEditorSocket])

    return (
        <>
            Playground
            Project id : {projectIdFromUrl}
            <div className="flex">
                <TreeStructure projectId={projectIdFromUrl} />
                <EditorComponent />
                
            </div>
            
        </>
    )
}

export default ProjectPlayground;