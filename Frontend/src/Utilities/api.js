import axios from "axios"

const baseUrl = import.meta.env.VITE_API_URL;

export const getFiles = async () => {
    const res = await axios.get(`${baseUrl}/files`);
    return res.data.files;
}

export const sendChatMessage = async (data) => {
    const res = await axios.post(`${baseUrl}/chat`, data);
    return res.data;
}

export const SummarizeApi = async (tab_Id) => {
    const res = await axios.post(`${baseUrl}/summarize/${tab_Id}`);
    return res.data.message;
}