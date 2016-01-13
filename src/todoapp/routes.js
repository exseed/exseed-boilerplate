import { models } from 'exseed';

export default function routes({ app }) {
  app.get('/api/todolist', (req, res) => {
    models.todolist
      .find()
      .then((todolist) => {
        res.json(todolist);
      });
  });

  app.post('/api/todolist', (req, res) => {
    models.todolist
      .create(req.body.todo)
      .then((todo) => {
        res.json(todo);
      });
  });
}