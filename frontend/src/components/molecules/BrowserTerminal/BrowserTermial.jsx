import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { AttachAddon } from "@xterm/addon-attach"
import '@xterm/xterm/css/xterm.css'
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useEditorSocketStore } from "../../../store/editorSocketStore"
import { usePortStore } from "../../../store/portStore"
import { useTerminalSocketStore } from "../../../store/terminalSocketStore"

export const BrowserTerminal = ()=>{

    const terminalRef = useRef(null)
    
   const { terminalSocket } = useTerminalSocketStore()

    useEffect(()=>{
        const term = new Terminal({
            cursorBlink : true,
            fontSize : 16,
            fontFamily : `"DejaVu Sans Mono", monospace`,
            theme : {
                background : "black",
                foreground : "#ffffff",
                cursor : "#f8f8f3"
            },
            convertEol : true,
        })

        term.open(terminalRef.current)
        let fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        fitAddon.fit()

        // socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`,{
        //     query : {
        //         projectId : projectIdFromUrl
        //     }
        // })

        if(terminalSocket) {
            terminalSocket.onopen = () => {
                const attachAddon = new AttachAddon(terminalSocket);
                term.loadAddon(attachAddon);
                // socket.current = ws;
            }
        }

        return ()=>{
            term.dispose()
        }
    },[terminalSocket])

    return(
        <div 
            ref={terminalRef}
            className="h-screen w-screen overflow-auto border-t border-gray-200"
            id="terminal-container"
        >
        
        
        </div>
    )
}