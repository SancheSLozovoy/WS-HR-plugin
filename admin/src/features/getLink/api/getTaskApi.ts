import axios from 'axios';


export const fetchValidTasks = async (specialtyId: number) => {
  try {
    const response = await axios.get(`http://localhost:1337/api/tasks?filters[specialty][id][$eq]=${specialtyId}&filters[isActive][$eq]=true`);
    console.log(response.data.data)
    return response.data.data; 
  } catch (error) {
    console.error('Ошибка при получении задач по специальности:', error);
    return [];
  }
};