function CreateProjectButton({imageSource,handleCreateProject,libraryName,idName,loading}){
    return(
        <div
            className="border mx-2 bg-gray-800 text-white border-gray-300 px-2 py-1 w-50 h-50 rounded-md flex flex-col items-center hover:cursor-pointer shadow-lg"
            onClick={handleCreateProject}
            id={idName}
            disabled={loading}
        >   
                <img 
                    src={imageSource} 
                    alt="" 
                    className="w-40 h-40 mt-1"
                />
                <span className="mt-1">{libraryName}</span>
        </div>
    )
}

export default CreateProjectButton