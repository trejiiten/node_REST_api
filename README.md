# QAA Extent Reports REST api
REST api built using node.js, sequelize.js, and MySQL

## Installation
Clone the directory to your local machine.
```bash
git clone {repo_name}
```

Use [npm](https://www.npmjs.com/) and initialize the folder.
```bash
npm init
```

Once initialization is complete, to run, simply type the following into the terminal:
```bash
npm start
```

## Purpose
The purpose of this application is to store all relevant information from a test run, pass it to an API, which will then parse and persist the data into a MySQL database using the Sequelize ORM.


## Technology Information
- [node.js](https://nodejs.org/en/)
- [Sequelize.js](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)


## Local Development
for any local development, you will need to install [MySQL server](https://dev.mysql.com/downloads/mysql/)


## Application dependencies
The following dependencies are used in this application:
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-promise-router](https://www.npmjs.com/package/express-promise-router)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [compression](https://www.npmjs.com/package/compression)
- [helmet](https://www.npmjs.com/package/helmet)

If they do not install after initializing, type the following command into your terminal:

Locally:
```bash
npm install --save bcrypt dotenv express express-promise-router jsonwebtoken morgan mysql2 sequelize sequelize-cli compression helmet
```

Globally:
```bash
npm install -g --save bcrypt dotenv express express-promise-router jsonwebtoken morgan mysql2 sequelize sequelize-cli compression helmet
```

For auto-refreshing your local server, type the following:
```bash
npm install --save nodemon
```

If you installed dependencies globally, to use the Sequelize CLI on your system, you will need to type the following in your project's root folder.:
```bash
sequelize init
```

If the installation was local, you will type the following:
```bash
npx sequelize init
```

The devDependency [prettier](https://prettier.io/) is not necessary for this project.


## License
[ISC](https://opensource.org/licenses/ISC)
