import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { AttachAddon } from "@xterm/addon-attach"
import '@xterm/xterm/css/xterm.css'
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

export const BrowserTerminal = ()=>{

    const terminalRef = useRef(null)
    const socket = useRef(null)
    const {projectId : projectIdFromUrl} = useParams()

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

        socket.current = new WebSocket(`ws://localhost:3000/terminal?projectId=${projectIdFromUrl}`)

        socket.current.onopen = ()=>{
            const attachAddOn = new AttachAddon(socket.current)
            term.loadAddon(attachAddOn)
        }

        return ()=>{
            term.dispose()
        }
    },[])

    return(
        <div 
            ref={terminalRef}
            className="h-full w-screen overflow-auto border-t border-gray-200"
            id="terminal-container"
        >
        
        
        </div>
    )
}