import axios from 'axios';
import { API } from '../constant';


/**
 * @param {File} file The input file (Only image)
 * @param {number} imgWidth The width of image to resize
 * @param {number} imgHeight The hieght of image to resize
 * @returns {Json} the response.data from the rest api
 */
export const uploadImage = async (file, imgKey = "image", imgWidth = 1280, imgHeight = 700) => {
    try {

        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(`${API}/upload/image?imgWidth=${imgWidth}&imgHeight=${imgHeight}&imgKey=${imgKey}`, formData);
        return response.data;
    } catch (error) {
        return {
            message: "Error uploading",
            status: "error"
        }
    }
}


/**
 * @param {File} file The input file (It should be of type video)
 * @returns {Json} the response.data from the rest api
 */
export const uploadVideo = async (file, videoKey="video") => {
    try {

        const formData = new FormData();
        formData.append("video", file);
        const response = await axios.post(`${API}/upload/video?videoKey=${videoKey}`, formData);
        return response.data;
    } catch (error) {
        return {
            message: "Error uploading",
            status: "error"
        }
    }
}


/**
 * @param {File} file The input file (It should be of type video)
 * @returns {Json} the response.data from the rest api
 */
export const uploadPdfFile = async (file, keyFile="pdf") => {
    try {

        const formData = new FormData();
        formData.append("pdfFile", file);
        const response = await axios.post(`${API}/upload/pdf?keyFile=${keyFile}`, formData);
        return response.data;
    } catch (error) {
        return {
            message: "Error uploading",
            status: "error"
        }
    }
}