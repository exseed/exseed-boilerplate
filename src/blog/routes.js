export default function({ app }) {
  app.get('/api/blog/article', (req, res) => {
    res.json([
      {
        id: 1,
        title: 'AAAAAAAAA',
      },
      {
        id: 2,
        title: 'BBBBB',
      },
    ]);
  });
};