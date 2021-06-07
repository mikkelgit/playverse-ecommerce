# E-Commerce App Server
E-Commerce App is an application to manage product. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /login

> login to existing account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (200 - Ok)_
```
{
  "id": <given id by system>,
  "email": "<posted email>",
  "access_token": "<given access token by system>"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized",
    "errors": [
        "Invalid Email / Password",
    ]
}
```

---
### POST /register

> register new account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (201 - Created)_
```
{
  "id" "<given id by system>"
  "email": "<posted email>"
  "access_token": "<given access token by system>"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": [
        "This email has been registered"
    ]
}
```

---
### GET /products

> Get all products

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
   {
    "id": 1,
    "name": "<asset name>",
    "image_url": "<asset image_url>",
    "price": "<asset price>",
    "stock": "<asset stock>",
    "CategoryId": "<asset category id>",
    "Category": "<asset category>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   {
    "id": 2,
    "name": "<asset name>",
    "image_url": "<asset image_url>",
    "price": "<asset price>",
    "stock": "<asset stock>",
    "CategoryId": "<asset category id>",
    "Category": "<asset category>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   ...
]
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "Login required",
    ]
}
```

---
### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert to>",
    "image_url": "<image_url to get insert to>",
    "price": "<price to get insert to>",
    "stock": "<stock to get insert to>",
    "CategoryId": "<category id to get insert to>",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "CategoryId": "<posted CategoryId>",
  "updatedAt": "2021-03-29T09:46:51.225Z",
  "createdAt": "2021-03-29T09:46:51.225Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "<detail> cannot be empty",
        "<detail> cannot be empty",
        ...
    ]
}
```

---
### GET /products/:id

> Get single product as defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <asset id by system>,
  "name": "<asset name>",
  "image_url": "<asset image_url>",
  "price": "<asset price>",
  "stock": "<asset stock>",
  "CategoryId": "<asset CategoryId>",
  "updatedAt": "2021-03-29T09:46:51.225Z",
  "createdAt": "2021-03-29T09:46:51.225Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Product not found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### PUT /products/:id

> Update a product defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert to>",
    "image_url": "<image_url to get insert to>",
    "price": "<price to get insert to>",
    "stock": "<stock to get insert to>",
    "CategoryId": "<category id to get insert to>",
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "CategoryId": "<posted CategoryId>",
  "updatedAt": "2021-03-29T09:46:51.225Z",
  "createdAt": "2021-03-29T09:46:51.225Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Product not found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### PATCH /products/:id

> Modify a product defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "stock": "<stock to get insert to>",
}
```

_Response (200 - OK)_
```
{
  "id": <asset id by system>,
  "name": "<asset name>",
  "image_url": "<asset image_url>",
  "price": "<asset price>",
  "stock": "<posted stock>",
  "CategoryId": "<asset CategoryId>",
  "updatedAt": "2021-03-29T09:46:51.225Z",
  "createdAt": "2021-03-29T09:46:51.225Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Product not found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### DELETE /products/:id

> Delete a product defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Product deleted successfully"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Product not found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### GET /carts

> Get user cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
   {
    "id": 1,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "quantity": "<asset quantity>",
    "done": "<[default = false]>"
    "amount": "<[default = 0]>"
    "Product": "<asset Product>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   {
    "id": 2,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "quantity": "<asset quantity>",
    "done": "<[default = false]>"
    "amount": "<[default = 0]>"
    "Product": "<asset Product>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   ...
]
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "Login Required",
    ]
}
```

---
### POST /carts

> Create new cart item

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "ProductId": "<ProductId to get insert to>",
    "quantity": "<quantity to get insert to>",
}
```

_Response (200 - Ok)_
```
{
  "message": [
      "Item added to cart"
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Not enough item"
}
```

---
### PATCH /carts/:id

> update quantity of cart item defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "newQuantity": "<newQuantity to get insert to>"
}
```

_Response (200 - OK)_
```
{
  "message": "Cart updated"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Cart not found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Not enough item."
    ]
}
```

---
### DELETE /carts/:id

> Delete a cart item defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Item removed from your cart"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Cart not found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### POST /checkout

> checkout everyproduct in logged user cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Cart Checked Out"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```

---
### GET /carts

> Get user cart

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
   {
    "id": 1,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "quantity": "<asset quantity>",
    "done": "<[default = false]>"
    "amount": "<[default = 0]>"
    "User": "<asset User>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   {
    "id": 2,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "quantity": "<asset quantity>",
    "done": "<[default = false]>"
    "amount": "<[default = 0]>"
    "User": "<asset User>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   ...
]
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "Login Required",
    ]
}
```

---
### GET /banners

> Get banners

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
   {
    "id": 1,
    "title": "<asset title>",
    "status": "<asset status>",
    "image_url": "<asset image_url>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   {
    "id": 2,
    "title": "<asset title>",
    "status": "<asset status>",
    "image_url": "<asset image_url>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   ...
]
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```

---
### POST /banners

> Create new banner

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title to get insert to>",
    "status": "<status to get insert to>",
    "image_url": "<image_url to get insert to>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "status": "posted status",
    "image_url": "posted image_url",
    "updatedAt": "2021-04-13T10:05:55.108Z",
    "createdAt": "2021-04-13T10:05:55.108Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "Login Required",
    ]
}
```

---
### PUT /banners/:id

> replace banner data defined by the id provided

_Request Params_
```
  Required: id=[integer]
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title to get insert to>",
    "status": "<status to get insert to>",
    "image_url": "<image_url to get insert to>"
}
```

_Response (200 - Ok)_
```
{
    "id": <asset id>,
    "title": "<posted title>",
    "status": "posted status",
    "image_url": "posted image_url",
    "updatedAt": "2021-04-13T10:05:55.108Z",
    "createdAt": "2021-04-13T10:05:55.108Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### DELETE /banners/:id

> Delete a banner defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Banner deleted"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Banner Not Found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### GET /categories

> Get categories

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
   {
    "id": 1,
    "name": "<asset name>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   {
    "id": 2,
    "name": "<asset name>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   ...
]
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```

---
### POST /categories

> Create new category

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert to>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "name": "<posted name>",
    "updatedAt": "2021-04-13T10:05:55.108Z",
    "createdAt": "2021-04-13T10:05:55.108Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "Login Required",
    ]
}
```

---
### PUT /categories/:id

> replace category data defined by the id provided

_Request Params_
```
  Required: id=[integer]
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert to>",
}
```

_Response (200 - Ok)_
```
{
    "id": <asset id>,
    "name": "<posted name>",
    "updatedAt": "2021-04-13T10:05:55.108Z",
    "createdAt": "2021-04-13T10:05:55.108Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### DELETE /categories/:id

> Delete a category defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Banner deleted"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Banner Not Found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```

---
### GET /wishlists

> Get user wishlists

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
   {
    "id": 1,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   {
    "id": 2,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "createdAt": "2021-03-29T09:46:51.225Z",
    "updatedAt": "2021-03-29T09:46:51.225Z"
   },
   ...
]
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```

---
### POST /wishlists

> Create new wishlist

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "ProductId": "<ProductId to get insert to>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "UserId": "<current user's id>",
    "ProductId": "<posted ProductId>",
    "updatedAt": "2021-04-13T10:05:55.108Z",
    "createdAt": "2021-04-13T10:05:55.108Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Bad Request",
    "errors": [
        "This product already in your wishlist",
    ]
}
```

---
### DELETE /wishlists/:id

> Delete a wishlist defined by the id provided

_Request Params_
```
  Required: id=[integer]
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Wishlist deleted"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": [
        "Internal Server Error"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found",
    "errors": [
        "Wishlist Not Found",
    ]
}
```
_Response (401 - Unauthorized)_
```
{
    "message": [
        "Unauthorized."
    ]
}
```