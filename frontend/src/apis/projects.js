import axiosInstance from "../config/axiosConfig";

export const createProjectApi = async(currentProjectName)=>{
    try {
        const response = await axiosInstance.post(`/api/v1/projects/${currentProjectName}`);
        console.log(response.data);
        return response.data
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const getProjectTree = async(projectId)=>{
    try {
        const response = await axiosInstance.get(`/api/v1/projects/${projectId}/tree`)
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const getFileData = async(filePath)=>{
    try {
        const response = await axiosInstance.post('/api/v1/projects/file',{
            filePath : filePath,
        })
        console.log(response?.data?.response)
        return response?.data?.response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}