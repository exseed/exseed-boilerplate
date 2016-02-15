export const todolist = {
  identity: 'article',
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'json',
    },
  },
};