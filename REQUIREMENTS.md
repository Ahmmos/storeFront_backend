# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Base Url (http://localhost:3000/products)

- Index: to see all products make a get request to http://localhost:3000/products and you will get all the products avialble.

- Show: to see a spicific product simply make a get request to http://localhost:3000/products/:id in the params insert the spicified product id to return it.
  orders

- Create [token required]: to create a new product make a post request to http://localhost:3000/products and provide three things (name, price, category) of the product in the request body

- [OPTIONAL] Top 5 most popular products: to get the top five most popular products make a get request to http://localhost:3000/products/top/top5 and you will get the top 5 products by its product_id.

- [OPTIONAL] Products by category (args: product category): to get the products categorized by a specific category just make a get request to http://localhost:3000/products/cat/"your_category" replace "your_category" with your desired category and you will get all products under this category

#### Users

- Base Url (http://localhost:3000/users)

- Index [token required]: to see all the users make a get request to http://localhost:3000/users and you will get all the users data except password for scurity issues.

- Show [token required]: to see a specific user simply make a get request to http://localhost:3000/users/:id in the id insert the spicified user id to return it

- Create [No token required]: to create a new user make a post request to http://localhost:3000/users and provide four things (userName,firstName, lastName, password) of the user in the request body. finally, you will recieve a token for some other CRUD functions.

- Update [token required]: to update a specific user make a put request to http://localhost:3000/users and provide five things (id,userName,firstName, lastName, password) of the user you want to update in the request body and you will recieve success with updated info or failed message.

- Authenticatation: to authenticate a user make a post request to http://localhost:3000/authenticate and provide (userName, password) of the user in the request body. finally, if the data mathes a user it will be returned.

#### Orders

Base Url (http://localhost:3000/orders)

- Create [token required]: to create a new order make a post request to http://localhost:3000/orders and provide two things (status, user_id) of the order in the request body

- Index [token required]: to to see all orders make a get request to http://localhost:3000/orders and you will get all the orders

- Delete Order [token required]: to delete a specific order simply make a delete request to http://localhost:3000/orders/:id in the id insert the spicified user id to delete it and returend the deleted order

- [OPTIONAL] Completed Orders [token required]: to see the completed order by a specific user simply make a get request to http://localhost:3000/orders/:id in the id insert the spicified user id to reture all the completed orders.

#### Products_order

- addProduct [token required]: to add a new product to your orders make a post request to http://localhost:3000/orders/:id/products where the id is the order id and you will provide
  (quantity, product id) in the request body
- allorders [token required]: to get all the products for aspecific order make a get request to http://localhost:3000/orders/:id/products where the id is the order id and will return all the order_id products

### database

you must have a database named storefront_db and storefront_test_db for testing
once the server is started you are connected to the databse

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database schemas

### users table

id SERIAL PRIMARY KEY,
userName VARCHAR(50) NOT NULL,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL

### orders table

id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id integer NOT NULL REFERENCES users(id)

### products table

id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
price INTEGER NOT NULL,
category VARCHAR(50) NOT NULL

### products_ordes table

id SERIAL PRIMARY KEY,
quantity integer,
product_id bigint NOT NULL REFERENCES products(id),
order_id bigint NOT NULL REFERENCES orders(id)
