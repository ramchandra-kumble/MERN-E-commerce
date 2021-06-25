const bcrypt = require('bcryptjs')

const users = [
    {
      name: 'Admin User',
      email: 'admin@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true  

    },
    {
        name: 'Ramesh Kumar',
        email: 'ramesh@email.com',
        password: bcrypt.hashSync('123456', 10)
     
      },
      {
        name: 'Gita Kumar',
        email: 'gita@email.com',
        password: bcrypt.hashSync('123456', 10)
       
      }
]

module.exports = users