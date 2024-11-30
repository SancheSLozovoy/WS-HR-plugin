import axios from "axios";

export const invalidateTask = async (linkId: number) => {
  try {
    await axios.put(`http://localhost:1337/api/task-links/${linkId}`, {
      data: { 
        isValid: false 
      },
    });
  } catch (error) {
    console.error('Ошибка при инвалидации ссылки:', error);
  }
};