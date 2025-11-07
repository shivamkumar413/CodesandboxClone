import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"



export const EditorComponent = () => {

    const [editorState,setEditorState] = useState({
        theme : null
    })

    async function downloadTheme(){
        const response = await fetch('/githubDarkTheme.json')
        const data = await response.json()
        console.log(data)
        setEditorState({...editorState,theme:data})
    }

    function handleEditorTheme(editor,monaco){
        monaco.editor.defineTheme('github-dark', editorState.theme);
        monaco.editor.setTheme('github-dark');
    }

    useEffect(()=>{
        downloadTheme()
    },[])

    return(
        <>
        {   editorState.theme &&
            <Editor
                height={'80vh'}
                width={'100%'}
                defaultLanguage="javascript"
                defaultValue="//Welcome to the playground"
                theme="vs-dark"
                options={{
                    fontSize : 18,
                    fontFamily : 'monospace'
                }}
                onMount={handleEditorTheme}
            />
        }

        </>
    )
}