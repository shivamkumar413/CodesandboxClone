import { useNavigate } from "react-router-dom"
import { useCreateProject } from "../hooks/apis/mutation/useCreateProject"
import CreateProjectButton from "../components/atoms/CreateProjectButton/CreateProjectButton"
import { useCreateProjectStore } from "../store/createProjectStore"
import { useState } from "react"
import { LoaderIcon } from "lucide-react"

export const CreateProject = ()=>{

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const { mutateAsync ,isPending } = useCreateProject()
    const { setCurrentProject } = useCreateProjectStore()
    
    async function handleCreateProject(e){
        try {
            setLoading(true)
            e.stopPropagation();
            console.log(e.target.id)
            setCurrentProject(e.target.id)
            const response =  await mutateAsync()
            setTimeout(()=>{
                navigate(`/project/${response.data}`)
                setLoading(false)
            },3000);
        } catch (error) {
            console.log("Error creating project : ",error)
            throw error;
        }
    }

    return(
        <>
            <h1>Create Project</h1>
            <div className="grid grid-cols-3">
                <CreateProjectButton 
                    imageSource={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"} 
                    handleCreateProject={handleCreateProject}
                    libraryName={"React (JS)"}
                    idName="react"
                    loading={loading}
                />

                <CreateProjectButton 
                    imageSource={"https://avatars.githubusercontent.com/u/79226042?s=280&v=4"}
                    handleCreateProject={handleCreateProject}
                    libraryName={"Solid (JS)"}
                    idName="solid"
                    loading={loading}
                />

                <CreateProjectButton 
                    imageSource={"https://raw.githubusercontent.com/sveltejs/svelte/29052aba7d0b78316d3a52aef1d7ddd54fe6ca84/site/static/images/svelte-android-chrome-512.png"}
                    handleCreateProject={handleCreateProject}
                    libraryName={"Svelte (JS)"}
                    idName={"svelte"}
                    loading={loading}
                />

                <CreateProjectButton 
                    imageSource={"https://cdn.iconscout.com/icon/free/png-256/free-vue-dot-js-icon-svg-download-png-3030285.png?f=webp"}
                    handleCreateProject={handleCreateProject}
                    libraryName={"Vue (JS)"}
                    idName={"vue"}
                    loading={loading}
                />
            </div>
            {isPending && 
                <p> Creating Project... </p>
            }

            {
                loading &&
                    <>
                        <div className="w-screen flex justify-center items-center">
                            <LoaderIcon className="animate-spin"/>
                            <p>Loading...</p>
                        </div>
                        
                    </>
                    
            }
        </>
    )
}