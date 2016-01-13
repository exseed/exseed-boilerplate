import tokenParser from './tokenParser';

export default function middlewares({ app }) {
  app.use(tokenParser());
}