import fs from 'fs/promises'

export const handleEditorSocketEvents = (socket)=>{
    socket.on("writeFile",async ({data,pathToFileOrFolder})=>{
        try {
            console.log("data at backend :",data)
            console.log("Path to file at backend : ",pathToFileOrFolder)

            // const stringData = data.toString()
            // const stringPath = pathToFileOrFolder.toString()
            const response = await fs.writeFile(pathToFileOrFolder,data);
            console.log("Write response : ",response)
            socket.emit("writeFileSuccess",{
                data : "File written successfully"
            })
        } catch (error) {
            console.log("Error writing the file ",error)
            socket.emit("error",{
                data : "Error writing the file"
            })
        }
    })

    socket.on("createFile", async ({ pathToFileOrFolder })=>{
        //how to check file already exists or not as exists is deprecated and stat is giving error

        try {
            const response = await fs.writeFile(pathToFileOrFolder,"//welcome to the playground")
            console.log("Response in create file : ",response)
            socket.emit("createFileSuccess",{
                data : "File created successfully"
            })
        } catch (error) {
            console.log("Error creating the file ",error)
            socket.emit("error",{
                data : "Error creating the file"
            })
        }
    })

    socket.on("readFile",async ({pathToFileOrFolder})=>{
        try {
            const response = await fs.readFile(pathToFileOrFolder)
            console.log(response.toString())
            socket.emit("readFileSuccess",{
                value : response.toString(),
                path : pathToFileOrFolder
            })
        } catch (error) {
            console.log("Error reading the file ",error)
            socket.emit("error",()=>{
                data : "Error reading the file"
            })
        }
    })

    socket.on('deleteFile',async ({pathToFileOrFolder})=>{
        try {
            console.log("Path in delete file", pathToFileOrFolder)
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess",{
                data : "Successfully deleted the file"
            })
        } catch (error) {
            console.log("Error deleting the file ",error)
            socket.emit("error",{
                data : "Error deleting the file"
            })
        }
    })

    socket.on('renameFile',async ({oldPath,newPath})=>{
        try {
            if((await fs.stat(oldPath)).isDirectory()){
                await fs.cp(oldPath,newPath,{recursive:true});
                await fs.rm(oldPath,{recursive : true})
            }else{
                const response = await fs.rename(oldPath,newPath)
            }
            socket.emit("renameFileSuccess",{
                data : "Successfully renamed the file"
            })
        } catch (error) {
            console.log("Error renaming the file ",error)
            socket.emit("error",{
                data : "Error renaming the file"
            })
        }
    })

    socket.on("createFolder",async ({ pathToFileOrFolder })=>{
        try {
            const response = await fs.mkdir(pathToFileOrFolder)
            socket.emit("createFolderSuccess",{
                data : "Folder created successfully"
            })
        } catch (error) {
            console.log("Error creating folder ",error);
            socket.emit("error",{
                message : "Error creating the folder"
            })
        }
    })

    socket.on("deleteFolder",async ({pathToFileOrFolder})=>{
        try {
            const response = await fs.rmdir(pathToFileOrFolder,{recursive : true})
            socket.emit("deleteFolderSuccess",{
                data : "Deleted folder successfully"
            })
        } catch (error) {
            console.log("Error deleting the folder ",error)
            socket.emit("error",{
                message : "Error deleting the folder"
            })
        }
    })

}   