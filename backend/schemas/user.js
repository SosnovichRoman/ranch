export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'login',
        title: 'Login',
        type: 'string',
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
      },
      {
        name: 'role',
        title: 'Role',
        type: 'reference',
        to: [{type: 'userRoles'}]
      }
    ]
}