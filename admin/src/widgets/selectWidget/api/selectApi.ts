import axios from 'axios';

export const fetchSpecialties = async () => {
  try {
    const response = await axios.get('/api/specialties');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка специальностей:', error);
    return [];
  }
};
