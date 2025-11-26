import Docker from 'dockerode'

const docker = new Docker()

export const handleContainerCreate = async (projectId,socket,req,tcpSocket,head)=>{
    console.log("PROJECT ID recieved for container creation ",projectId);

    try {

        const container = await docker.createContainer({
            Image : "sandbox",
            AttachStdin : true,
            AttachStdout : true,
            AttachStderr : true,
            Cmd : ['/bin/bash'],
            name : projectId+Math.random(),
            Tty : true,
            User : "sandbox",
            Volumes : {
                "/home/sandbox/app" : {}
            },
            ExposedPorts : {
                    "5173/tcp" : {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig : {
                Binds : [ // mounting the project directory to the container
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings : {
                    "5173/tcp" : [
                        {
                            "HostPort": "0" // random port will be assigned by docker
                        }
                    ]
                }
            }

        })

        console.log("container created with id ",container.id)

        await container.start();
        console.log("Container started")

        socket.handleUpgrade(req,tcpSocket,head,(establishedWSConn)=>{
            socket.emit("connection",establishedWSConn,req,container)
        })
        // container.exec({
        //     Cmd : ['/bin/bash'],
        //     User : 'sandbox',
        //     AttachStdin : true,
        //     AttachStdout : true,
        //     AttachStderr : true,
        // }, (err,exec)=>{
        //     if(err){
        //         console.log("Error while creating exec ",err);
        //         return;
        //     }

        // })

    } catch (error) {
        console.log("Error while creating container ",error)
    }
}