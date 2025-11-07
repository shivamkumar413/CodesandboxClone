import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";

function ProjectPlayground (){

    const {projectId} = useParams()

    return (
        <>
            Playground
            Project id : {projectId}
            <EditorComponent />
        </>
    )
}

export default ProjectPlayground;