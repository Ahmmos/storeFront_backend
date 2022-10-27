# Storefront Backend Project

This repo contains all APIs and CRUD operation for storefront backend.

## Getting Started and Setup

-first of all clone this repo to your pc

- add your .env file then fill it with Env Variables (next header)
- run db-migrate up Which will create the 4 tables on your database (orders , users , products and order_products tables)
- to undo what you create just run db-migrate down will take you a step backword.
- finally yarn start will start your server so you can do any of the CRUD opertaions using tool like postman to test.
- some CRUD functions needs a token to be done

## To Run and Setup the project

### install all the dependincies

- use 'yarn add or npm install ...'
- i used here yarn package manager

#### express

- yarn add express
- yarn add --save-dev @types/express

#### typescript

- yarn add --save-dev typescript

#### db-migrate

- yarn add -g db-migrate

#### bcrypt

- yarn add bcrypt
- yarn add --save-dev @types/bcrypt

#### morgan

- yarn add --save morgan
- yarn add --save-dev @types/morga

#### jsonwebtoken

- yarn add jsonwebtoken
- yarn add --save-dev @types/jsonwebtoken

#### dot-env

- yarn add dotenv --save

#### jasmine

- yarn add jasmine @types/jasmine ts-node --save-dev`

#### supertest

- yarn add supertest`
- yarn add --save-dev @types/supertest

## Create the databases

- Connect the default database postgres database as the server's user 'psql -U postgres'
- Enter your password (you have been created during psql installation)
- create user - 'CREATE USER shoppping_user WITH PASSWORD "passworda234"'
- Create the database and the test database following the commands - 'CREATE DATABASE storefront_db;' - 'CREATE DATABASE storefront_db_test;'
- Connect the databases and grant all Privilrges
  - Grant the dev database
    - '\c storefront_db'
    - 'GRANT ALL PRIVILEGES ON DATABASE storefront_db to shoppping_user;'
  - Grant the test database
    - '\c storefront_db_test'
    - 'GRANT ALL PRIVILEGES ON DATABASE storefront_db_test to shoppping_user;'

## Migrate Database

- run 'yarn db-migrate up'

## Run the app

- run 'yarn start or yarn dev or npm run start' all of these commands will run the app with nodemon

## Running ports

- After start up, the server will start on port 3000 and the database on port 5432

## Endpoint Access

All endpoints are described in the REQUIREMENT.md file.

## Run the tests

- run 'yarn test or npm run test' all of these commands will run the app with nodemon

## ENV variables

- DB_HOST=localhost
- DB_NAME=postgres
- DB_USER=postgres
- DB_PASSWORD= "your password"
- BCRYBT_PASSWORD =peppermakesfoodsbetter
- SALT_ROUNDES = 10
- TEST_DB_NAME=ground_database
- TOKEN_SECRET=nevergiveup
- ENV=dev

## Token

it will be created with creation of new user route or authenticate route you will find it in the header tab in postman so you need to copy and paste it to the authorization tab to make all CRUD functions needs an authorization before done.

## Used Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Author's name

This project made by Ahmed Mostafa from scratch under the supervision of Udacity.

# storefront_backend
