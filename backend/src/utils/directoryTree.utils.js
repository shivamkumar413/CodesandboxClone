import fs from 'fs'
import path from 'path'

export function directoryTree(projectPath){

    function createDirectoryTree(inPath){
        const modifiedPath = inPath
        if (inPath.includes("node_modules\\.bin")) {
            return; // skip
        }
        const stats = fs.statSync(inPath);

        const node = {
            path : modifiedPath,
            name : path.basename(modifiedPath)
        }

        if(stats.isDirectory()){
            node.type = 'directory';
            node.children = [];

            const files = fs.readdirSync(modifiedPath);
            files.forEach((file)=>{
                const newPath = path.join(modifiedPath,file)
                const childNode = createDirectoryTree(newPath)
                node.children.push(childNode)
            })
        }
        else{
            node.type = 'file'
        }

        return node;
    }

    const fileTreeObject = createDirectoryTree(projectPath);
    return fileTreeObject;


}