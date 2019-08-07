# Book collection server

Create simple RESTful API server in Node.js for book collection app. Each book has title, description and 1-n authors. Created API endpoints should allow search in collection and book management.

Implementation details:

- app should support standard CRUD ops
- we prefer Typescript
- tools, framework and database are up to you, but you have write short why? behind your decision

# Documentation

## Pre-requisites

It is expected that the person running this code has the latest stable version of Node.js and Postgres installed and configured.

I worked with many-to-many relationships for book-authors, as I expected one author could have multiple books. One book can have 1-n authors as per assignment.

To migrate the database run:

```
yarn migrate
```

To seed the database (not required) run:

```
yarn seed
```

Environment variables:

```
PORT= // port number
NODE_ENV= // environment in which the app runs
LOCAL_DB_DEV=  // postgres connection string
```

## Frameworks, dependencies, ...

- Express - is a flexible Node.js framework that provides robust set of features for web and mobile applications. The pleathora of HTTP utility methods and middleware available allows me to quickly create robust API.

Express middleware I utilized:

- helmet - used it to hide various HTTP headers to decrease possible attack vector
- compression - decreases the size of the response body thus increasing performance
- cors - to deal with cross-origin resource sharing

Other dependencies:

- dotenv - to load environment variables from a `.env` file
- knex - as a SQL query builder for Postgres
- nodemon - a devDependency to restart server on changes, so I don't have to do it manually

## Database

One of the main considerations for picking a database was to either choose SQL or NOSQL database.
The reason I chose SQL DB (Postgres) was because the data structure was very predictable and it has higher reliability and data consistency.

## What else would I add, if I had more time

- API documentation for every endpoint with required request headers/params/query strings/body and responses with status codes (Swagger/APIdocs)
- Proper data validation for PUT/POST request before it touches DB (Joi)
- Tests (Mocha, Chai, Supertest). I tested it manualy in Postman, when developing.
- Restricted access to the endpoints
- Server logging (probably with Winston/Morgan)
