import axios from "axios";

export const fetchValidTaskLinks = async (taskId: number) => {
    try {
        const response = await axios.get(`http://localhost:1337/api/task-links?filters[task][id][$eq]=${taskId}&filters[isValid][$eq]=true`);
        return response.data.data;
    } catch (error) {
        console.error('Ошибка при получении валидных ссылок:', error);
        return [];
    }
};