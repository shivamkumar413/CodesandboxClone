import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import '@xterm/xterm/css/xterm.css'
import { useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

export const BrowserTerminal = ()=>{

    const terminalRef = useRef(null)
    const socket = useRef(null)
    const {projectId : projectIdFromUrl} = useParams()

    useEffect(()=>{
        const term = new Terminal({
            cursorBlink : true,
            fontSize : 16,
            fontFamily : "Ubuntu Mono",
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

        socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`,{
            query : {
                projectId : projectIdFromUrl
            }
        })

        socket.current.on("shell-output",(data)=>{
            console.log("shell output ",data)
            term.write(data)
        })

        term.onData((data)=>{
            console.log("clicked : ",data)
            socket.current.emit("shell-input",data)
        })

        return ()=>{
            term.dispose()
            socket.current.disconnect()
        }
    },[])

    return(
        <div 
            ref={terminalRef}
            className=" h-[30vh] overflow-auto border-t border-gray-200"
            id="terminal-container"
        >
        
        
        </div>
    )
}