import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import gitHubDarkTheme from '../../../githubDarkTheme.json'
import { useFileContentStore } from "../../../store/fileContentStore"



export const EditorComponent = () => {

    const [editorState,setEditorState] = useState({
        theme : null
    })
    const {fileContent} = useFileContentStore()

   
    // async function downloadTheme(){
    //     const response = await fetch('/githubDarkTheme.json')
    //     const data = await response.json()
    //     console.log(data)
    //     setEditorState({...editorState,theme:data})
    // }

    function handleEditorTheme(editor,monaco){
        monaco.editor.defineTheme('github-dark', editorState.theme);
        monaco.editor.setTheme('github-dark');
        
    }

    useEffect(()=>{
        // downloadTheme()
         setEditorState({...editorState,theme:gitHubDarkTheme})

    },[])

    return(
        <>
        {   editorState.theme &&
            <Editor
                height={'100vh'}
                width={'100%'}
                defaultLanguage="javascript"
                defaultValue="//Welcome to the playground"
                // theme="vs-dark"
                options={{
                    fontSize : 15,
                    fontFamily : 'monospace'
                }}
                onMount={handleEditorTheme}
                value={`${fileContent}`}
            />
        }

        </>
    )
}