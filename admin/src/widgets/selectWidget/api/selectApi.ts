import axios from 'axios';

export const fetchSpecialties = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/specialties');
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при получении списка специальностей:', error);
    return [];
  }
};
