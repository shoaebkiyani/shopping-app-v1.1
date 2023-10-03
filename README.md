# React + TypeScript + Vite

**TechZone User Manual** 

This Fullstack E-Commerce website has been constructed using Vite, React with TypeScript, Tailwind, 
and Java Spring Boot. PostgreSQL Database serves as the primary storage solution for data. 
Swagger is used for API design.

**For testing purposes, the following tools are required: **
- Code editor (VSCode for Frontend, IntelliJ for Backend) recommended. 
- Database (PostgreSQL recommended)
  
Links to repositories: 
- Frontend: https://github.com/shoaebkiyani/shopping-app-v1.1 
- Backend: https://github.com/shoaebkiyani/shopping-app-v1.0_server 
- PostgreSQL database can be installed using Docker or directly to the system.
   
**How to use the application:**
For the front-end part of the project:
- Clone the repository, 
- Install node modules using `npm install`, 
- Run the application using `npm run dev`. 

To avoid any errors/surprises, make sure that the backend server is up and 
running and the PostgreSQL database is connected and started. 
Make sure to update the `application.properties` file accordingly for proper connectivity 
of the database with the backend server.

For the back-end part of the project:
- Clone the repository,
- Make sure to have JAVA (JDK) installed on the system. This application is built on Java version 17.
- Run the application from the main file (in this project it is SpringSecurityApplication).
- Also make sure to have a database connected with the project. PostgreSQL is used in this project for storage and is configured in application.properties file.
- A Complete list of packages used in the project can be seen in the pom.xml file.

**About the application:** 
This application has the following features: 
Note: You might find some of the features missing. They will be added soon to the application. 
- Registration / Signup 
- Login 
- Products List, Single Product Details 
- Category 
- Cart 
- Place Order 
- CRUD API 
- Search Products 
- Sorting, Filtering 
- User 
To test the application, the default user has an Admin role. To access the Admin 
Dashboard, please use the following credentials: 
       username: admin 
       password: admin
The admin user has the following features: 
- see the list of products & categories, 
- filter the products (in-stock or out-of-stock), 
- sort the list based on price, 
- add the product(s) & category, 
- edit the product(s) & category, 
- delete the product(s) & category, 
- delete the user(s) 

New users can only be created using the Register page. Admin cannot create a new user using 
the dashboard. 
**Note: To add a product, a category must be defined beforehand. Initially, the database will be empty 
therefore there will be no category and no product in the store.**

The registered user has the following features: 
- Browse the products, 
- Search for the specific product using the product name, 
- Add the products to the shopping cart, 
- Increment the product or remove the product from the cart, 
- Place the order.
  
**Scenario 1: **
The user wants to buy an iPhone online. The user will browse the store online and find the 
product. The user can also be able to search for a specific product to see if it is available in 
the store or not. Furthermore, the user can see the details of the product by clicking the item. 

**Scenario 2:** 
If the user wants to place an order, the user must register first, if it is a new user or otherwise log in (At the moment this can be done without getting registered or login). The user can 
register through the Register page.  Once the user is registered, the user will be diverted to the Login page where the user can log in with the right credentials and place the order.

**Scenario 3:** 
The admin wants to add a new product or category to the database. The admin will log in with 
the given credentials and access the admin dashboard. In the admin dashboard, the admin 
will be able to see all the available products in the store. The admin has the right to add a new 
product, edit the already stored product, or delete the product. The admin also has the right 
to delete the user. 
 
Thank you for using TechZone Web Store.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
