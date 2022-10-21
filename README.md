# Storefront Backend Project

This repo contains all APIs and CRUD operation for storefront backend.

## Getting Started and Setup 

-first of all clone this repo to your pc 
- add your .env file then fill it with Env Variables (next header)  
- run db-migrate up Which will create the 4 tables on your database (orders , users , products and order_products tables) 
- to undo what you create just run db-migrate down will take you a step backword.
- finally yarn start will start your server so you can do any of the CRUD opertaions using tool like postman to test.
- some CRUD functions needs a token to be done 

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

## DataBases
- you must have a database named storefront_db and storefront_test_db for testing
once the server is started you are connected to the databse
## Create the databases
- first open psql with your password
- type the commands  CREATE DATABASE storefront_db;  
- CREATE DATABASE storefront_test_db;   for adding testing databases 
- then do 
- GRANT ALL PRIVILEGES ON DATABASE storefront_db to your_user_name;
- Do the same for the testing database

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
