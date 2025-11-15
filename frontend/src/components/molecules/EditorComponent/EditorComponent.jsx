import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import gitHubDarkTheme from '../../../githubDarkTheme.json'
import { useFileContentStore } from "../../../store/fileContentStore"
import { useEditorSocketStore } from "../../../store/editorSocketStore"

export const EditorComponent = () => {

    let timerId;
    const [editorState,setEditorState] = useState({
        theme : null
    })
    const [language,setLanguage] = useState("")
    const {fileContent,setFileContent} = useFileContentStore()

    const { editorSocket } = useEditorSocketStore()

    function handleEditorTheme(editor,monaco){
        monaco.editor.defineTheme('github-dark', editorState.theme);
        monaco.editor.setTheme('github-dark');
        
    }

    function handleChange(value,event){
        
        if(timerId) clearTimeout(timerId)
        timerId = setTimeout(()=>{
            console.log(value)
            editorSocket.emit("writeFile",{
                data : value,
                pathToFileOrFolder : fileContent?.path
            })
        },2000)
        
    }

    useEffect(()=>{

         setEditorState({...editorState,theme:gitHubDarkTheme})

    },[])
    editorSocket?.on("readFileSuccess",(data)=>{
        console.log("Read file success : ",data)
        setFileContent(data?.value,data?.path)
        
        const extension = data?.path?.split(".").pop()
        console.log(extension)
        if(extension == 'html') setLanguage("html")
        if(extension == 'css') setLanguage("css")
        if(extension == 'js' || extension =='jsx') setLanguage("javascript")
    })
    return(
        <>
            {editorState.theme &&
                <Editor
                    height={'100vh'}
                    width={'100%'}
                    language={language}
                    defaultValue="//Welcome to the playground"
                    // theme="vs-dark"
                    options={{
                        fontSize : 15,
                        fontFamily : 'monospace'
                    }}
                    onMount={handleEditorTheme}
                    value={fileContent?.data ? fileContent?.data : "//Welcome to Playground"}
                    onChange={handleChange}
                />
            }

        </>
    )
}