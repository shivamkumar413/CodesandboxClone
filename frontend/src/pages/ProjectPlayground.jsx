import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { useEffect } from "react";
import {io} from 'socket.io-client'
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTermial";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { ActiveFileChip } from "../components/atoms/ActiveFileChip/ActiveFileChip";
import { ActiveFilePath } from "../components/atoms/ActiveFilePath/ActiveFilePath";

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
            <div className="flex h-screen">

                <Allotment className="h-full">
                    <Allotment.Pane minSize={100}>
                        <TreeStructure projectId={projectIdFromUrl} />
                    </Allotment.Pane>

                    <Allotment.Pane minSize={100} >

                        <Allotment className="h-full" vertical>
                            <Allotment.Pane minSize={100}>
                                <div className="h-full w-full bg-[#094771]">
                                    <ActiveFileChip />
                                    <ActiveFilePath />
                                    <EditorComponent />
                                </div>
                                
                            </Allotment.Pane>

                            <Allotment.Pane minSize={100}>
                                <BrowserTerminal />
                            </Allotment.Pane>
                        </Allotment>
                        
                    </Allotment.Pane>
                </Allotment>

            </div>
            
        </>
    )
}

export default ProjectPlayground;