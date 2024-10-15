import { v4 as uuidv4 } from 'uuid';

export default {
  async generateLink(ctx) {
    const { specialty } = ctx.request.body;

    // Найти активные задания для специальности
    const activeTasks = await strapi.db.query('api::task.task').findMany({
      where: { specialty, isActive: true },
      populate: ['taskLinks'],
    });

    if (activeTasks.length === 0) {
      return ctx.badRequest('Нет активных заданий для этой специальности');
    }

    // Случайно выбрать задание
    const randomTask = activeTasks[Math.floor(Math.random() * activeTasks.length)];

    // Генерируем UUID для ссылки
    const newUUID = uuidv4();

    // Создаем запись в Task Links
    await strapi.db.query('api::task-link.task-link').create({
      data: {
        uuid: newUUID,
        task: randomTask.id,
        isValid: true,
      },
    });

    // Формируем ссылку
    const link = `${ctx.request.origin}/tasks/${newUUID}`;
    return ctx.send({ link });
  },

  async validateLink(ctx) {
    const { uuid } = ctx.params;

    // Найти Task Link по UUID
    const taskLink = await strapi.db.query('api::task-link.task-link').findOne({
      where: { uuid, isValid: true },
      populate: ['task'],
    });

    if (!taskLink) {
      return ctx.badRequest('Ссылка недействительна или уже использована');
    }

    // Деактивируем ссылку (isValid = false)
    await strapi.db.query('api::task-link.task-link').update({
      where: { id: taskLink.id },
      data: { isValid: false },
    });

    // Возвращаем задание
    return ctx.send({ task: taskLink.task });
  },
};
