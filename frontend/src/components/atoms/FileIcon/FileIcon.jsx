import { FaJsSquare, FaReact, FaHtml5, FaGitAlt } from "react-icons/fa";
import { LuHash } from "react-icons/lu";
import { VscJson } from "react-icons/vsc";

export const FileIcon = ({extension})=>{
    return(
        <>
            {extension==='js' && <FaJsSquare className="text-yellow-400"/>}
            {extension==='jsx' && <FaReact className="text-sky-500"/>}
            {extension==='html' && <FaHtml5 className="text-orange-400"/>}
            {extension==='css' && <LuHash className="text-sky-400"/>}
            {extension === 'json' && <VscJson className="text-yellow-300"/> }
            {extension === 'gitignore' && <FaGitAlt className="text-orange-500"/>}
        
        </>
    )
}