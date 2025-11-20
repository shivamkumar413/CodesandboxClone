import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import gitHubDarkTheme from '../../../githubDarkTheme.json'
import { useFileContentStore } from "../../../store/fileContentStore"
import { useEditorSocketStore } from "../../../store/editorSocketStore"
import { editorLanguage } from "../../../utils/editorLanguage.utils"

export const EditorComponent = () => {

    let timerId;
    const [editorState,setEditorState] = useState({
        theme : null
    })
    const {fileContent} = useFileContentStore()

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

    // })
    return(
        <>
            {editorState.theme &&
                <Editor
                    height={'70vh'}
                    width={'100%'}
                    language={editorLanguage(fileContent?.extension)}
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