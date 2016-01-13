import { models } from 'exseed';

export default function init({ done }) {
  // create permissions
  models.permission
    .create([
      { id: 1, name: 'CREATE_USER' },
      { id: 2, name: 'DELETE_USER' },
      { id: 3, name: 'LOGIN' },
      { id: 4, name: 'POST_ARTICLE' },
    ])
    .then((permissions) => {
      console.log(permissions);
    })

    // create roles and users
    .then(() => {
      return models.role
        .findOrCreate({
          name: 'root',
          permissions: [1, 2, 3, 4],
        });
    })
    .then((role) => {
      return models.user
        .create({
          email: 'root@exseed.org',
          name: 'root',
          username: 'root',
          password: 'root',
          role: role.id,
        });
    })
    .then((user) => {
      return models.role
        .findOrCreate({
          name: 'admin',
          permissions: [1, 3, 4],
        });
    })
    .then((role) => {
      return models.user
        .create({
          email: 'admin@exseed.org',
          name: 'admin',
          username: 'admin',
          password: 'admin',
          role: role.id,
        });
    })
    .then((user) => {
      return models.role
        .findOrCreate({
          name: 'user',
          permissions: [3, 4],
        });
    })
    .then((role) => {
      return models.user
        .create({
          email: 'user@exseed.org',
          name: 'user',
          username: 'user',
          password: 'user',
          role: role.id,
        });
    })
    .then((user) => {
      return models.user
        .find()
        .populate('role');
    })
    .then((users) => {
      console.log(users);
    })

    // finish
    .then(done)
    .catch((err) => {
      console.error(err);
    });
}