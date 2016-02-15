import { models } from 'exseed';

export default function({ app }) {
  app.get('/api/blog/article', (req, res) => {
    models.article
      .find({
        select: ['id', 'title'],
      })
      .then((articles) => {
        res.json(articles);
      });
  });

  app.post('/api/blog/article', (req, res) => {
    models.article
      .create(req.body)
      .then((article) => {
        res.json({
          article: article,
          errors: [],
        });
      });
  });

  app.get('/api/blog/article/:id', (req, res) => {
    models.article
      .findOneById(req.params.id)
      .then((article) => {
        res.json(article);
      });
  });
};