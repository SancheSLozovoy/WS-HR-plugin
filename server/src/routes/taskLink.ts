export default {
    routes: [
      {
        method: 'GET',
        path: '/tasks/:uuid',
        handler: 'taskLink.validateLink',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/generate-task-link',
        handler: 'taskLink.generateLink',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  