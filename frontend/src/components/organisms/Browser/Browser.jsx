import { useEffect, useRef, useState } from "react"
import { useEditorSocketStore } from "../../../store/editorSocketStore"
import { useParams } from "react-router-dom"
import { usePortStore } from "../../../store/portStore"
import { ReloadOutlined } from "@ant-design/icons"
import { Input } from "antd"

export const Browser = ()=>{

    const [x,setX] = useState(0)
    const { projectId } = useParams()
    const { editorSocket } = useEditorSocketStore()
    const { port } = usePortStore()
    const browserRef = useRef(null);

    useEffect(()=>{
        if(!port){
            setTimeout(()=>{
                editorSocket?.emit("getPort",{
                    containerName : projectId
                }) 
                setX(x+1)
            },5000)
            
        }
    },[editorSocket,port])

    function handleRefresh() {
        if(browserRef.current) {
            const oldAddr = browserRef.current.src;
            browserRef.current.src = oldAddr;
        }
    }
    return(
        <>
            <Input 
                style={{
                    width: "100%",
                    height: "30px",
                    color: "white",
                    fontFamily: "Fira Code",
                    backgroundColor: "#282a35",
                }}
                prefix={<ReloadOutlined onClick={handleRefresh} />}
                defaultValue={`http://localhost:${port}`}
            />
            <iframe
                className="w-full h-screen"
                ref={browserRef}
                src={`http://localhost:${port}`}
            >

            </iframe>
        </>
    )
}