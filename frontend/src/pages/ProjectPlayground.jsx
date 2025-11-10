import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";

function ProjectPlayground (){
        

    const {projectId} = useParams()

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